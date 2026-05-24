"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { siteData } from "../lib/siteData";

export default function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoState, setVideoState] = useState<"loading" | "playing" | "fallback">("loading");

  // useEffect 1: Defer video loading until the page has fully loaded all other assets
  useEffect(() => {
    // 1. First line of defense: check navigator.connection API (Android/Chrome)
    if (typeof window !== "undefined" && navigator) {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        // If data saver is enabled or effective speed is slow (3G, 2G, slow-2g)
        if (conn.saveData || ["slow-2g", "2g", "3g"].includes(conn.effectiveType)) {
          console.log("Slow connection or Data Saver detected. Displaying lightweight WebP banner.");
          setVideoState("fallback");
          return;
        }
      }
    }

    const startVideoLoading = () => {
      console.log("All critical resources loaded. Initiating low-priority video mount.");
      setShouldLoadVideo(true);
    };

    // If the document is already fully parsed and loaded, wait 1s for layout stabilization, then load video
    if (document.readyState === "complete") {
      const timer = setTimeout(startVideoLoading, 1000);
      return () => clearTimeout(timer);
    } else {
      // Otherwise, wait for the browser's native 'load' event (after all CSS, fonts, and images are loaded)
      window.addEventListener("load", startVideoLoading);
      return () => window.removeEventListener("load", startVideoLoading);
    }
  }, []);

  // useEffect 2: Handle active playback and slow-network safety timers once deferred loading triggers
  useEffect(() => {
    if (!shouldLoadVideo || videoState === "fallback") return;

    // Second line of defense: Safety timeout of 3.5s starting from the moment video mounts.
    // If video fails to fire the 'playing' event within 3.5s (due to slow network buffering or iOS low-power modes), we fallback.
    const fallbackTimeout = setTimeout(() => {
      console.log("Video playback stalled or failed to start within 3.5s. Falling back to WebP banner.");
      setVideoState("fallback");
    }, 3500);

    const video = videoRef.current;
    if (!video) return;

    // Force muted & playsinline programmatically to satisfy aggressive browser autoplay policies
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 0.5;

    const triggerPlay = () => {
      video.play()
        .then(() => {
          // Playback successfully started
        })
        .catch((err) => {
          console.log("Autoplay was blocked by browser policy, waiting for interaction:", err);
        });
    };

    triggerPlay();

    // Re-apply playback rate if the browser resets it on loop
    const handleRateChange = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    // Safe fallback interaction listener to boot playback
    const handleInteraction = () => {
      triggerPlay();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    video.addEventListener("ratechange", handleRateChange);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      clearTimeout(fallbackTimeout);
      video.removeEventListener("ratechange", handleRateChange);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [shouldLoadVideo, videoState]);

  const handlePlaying = () => {
    console.log("Hero background video playing. Transitioning visual layer.");
    setVideoState("playing");
  };

  // If fallback is triggered, immediately render the optimized 92KB WebP image and unmount the video completely.
  if (videoState === "fallback") {
    return (
      <Image
        src="/assets/about-operations.webp"
        alt={`${siteData.companyName} Operations`}
        fill
        priority
        className={styles.heroBgVideo}
        style={{ objectFit: "cover", zIndex: 1 }}
      />
    );
  }

  // If page hasn't fully loaded yet, show the static optimized WebP image and DO NOT render the video element yet.
  if (!shouldLoadVideo) {
    return (
      <Image
        src="/assets/about-operations.webp"
        alt={`${siteData.companyName} Operations`}
        fill
        priority
        className={styles.heroBgVideo}
        style={{ objectFit: "cover", zIndex: 1 }}
      />
    );
  }

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
          opacity: videoState === "playing" ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      {/* Video absolute-positioned over image, starts invisible (opacity 0) and fades in smoothly once playing */}
      <video
        ref={videoRef}
        src="/assets/hero-working.mp4"
        poster="/assets/about-operations.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onPlaying={handlePlaying}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoState === "playing" ? 1 : 0,
          transition: "opacity 1.2s ease-in-out",
          pointerEvents: "none",
          zIndex: 2
        }}
        title={`${siteData.companyName} - Heavy Equipment in Action`}
      />
    </div>
  );
}
