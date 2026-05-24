"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { siteData } from "../lib/siteData";

export default function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryRef = useRef<NodeJS.Timeout | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const scheduleRetry = () => {
      if (cancelled || retryRef.current) return;
      retryRef.current = setTimeout(() => {
        retryRef.current = null;
        startPlayback();
      }, 1200);
    };

    const startPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.playbackRate = 0.5;

      const playAttempt = video.play();
      if (playAttempt) {
        playAttempt.catch(() => {
          scheduleRetry();
        });
      }
    };

    // Keep the still image visible, but never permanently remove the video.
    // Cold first visits can need longer buffering than refreshes because the MP4 is not cached yet.
    timeoutRef.current = setTimeout(() => {
      startPlayback();
    }, 300);

    video.playbackRate = 0.5;

    // Re-apply playback rate if the browser resets it on loop
    const handleRateChange = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    const handleReady = () => {
      setIsVideoReady(true);
      startPlayback();
    };

    const handleInteraction = () => {
      if (video && video.paused) {
        startPlayback();
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        startPlayback();
      }
    };

    const handleWindowFocus = () => {
      if (video.paused) {
        startPlayback();
      }
    };

    video.addEventListener("ratechange", handleRateChange);
    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("playing", handleReady);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("pointerdown", handleInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);
    video.load();
    startPlayback();

    return () => {
      cancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (retryRef.current) {
        clearTimeout(retryRef.current);
        retryRef.current = null;
      }
      video.removeEventListener("ratechange", handleRateChange);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("playing", handleReady);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  const handlePlaying = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (retryRef.current) {
      clearTimeout(retryRef.current);
      retryRef.current = null;
    }
    setIsVideoReady(true);
  };

  // Unified render tree to prevent React from unmounting and recreating the Image DOM node.
  // This completely eliminates any split-second image-reloading flashes or background color bleed-throughs.
  return (
    <div className={styles.heroBgVideo} style={{ position: "absolute", zIndex: 0 }}>
      {/* Lightweight WebP banner shown initially, and fades out when video is active */}
      <Image
        src="/assets/about-operations.webp"
        alt={`${siteData.companyName} Operations`}
        fill
        priority
        style={{
          objectFit: "cover",
          opacity: isVideoReady ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
          pointerEvents: "none",
          zIndex: 2
        }}
      />

      {/* Video absolute-positioned over image, starts invisible (opacity 0) and fades in smoothly once playing */}
      <video
        ref={videoRef}
        poster="/assets/about-operations.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onPlaying={handlePlaying}
        onPlay={handlePlaying}
        onLoadedMetadata={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.defaultMuted = true;
          e.currentTarget.playbackRate = 0.5;
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 1
        }}
        title={`${siteData.companyName} - Heavy Equipment in Action`}
      >
        <source src="/assets/hero-working.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
