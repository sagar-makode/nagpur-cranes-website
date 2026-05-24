"use client";

import React, { useRef, useEffect } from "react";
import styles from "../page.module.css";
import { siteData } from "../lib/siteData";

export default function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muted & playsInline programmatically to ensure autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.playbackRate = 0.5;

    let playPromise: Promise<void> | null = null;

    const playVideo = () => {
      if (!video.paused) return;

      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Playback might be delayed until user interaction
          console.log("Autoplay prevented or interrupted:", error);
        });
      }
    };

    // Attempt to play immediately on mount
    playVideo();

    // Re-apply playback rate if the browser resets it on loop/load
    const handleRateChange = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    const handlePlaying = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    // Attempt to play on user interaction if blocked by browser policy
    const handleInteraction = () => {
      playVideo();
      cleanupInteraction();
    };

    const setupInteraction = () => {
      window.addEventListener("click", handleInteraction, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      window.addEventListener("pointerdown", handleInteraction, { passive: true });
    };

    const cleanupInteraction = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };

    video.addEventListener("ratechange", handleRateChange);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("play", handlePlaying);
    setupInteraction();

    // Resume when coming back to the page/tab
    const handleVisibilityOrFocus = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      cleanupInteraction();
      video.removeEventListener("ratechange", handleRateChange);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("play", handlePlaying);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, []);

  return (
    <div className={styles.heroBgVideo} style={{ position: "absolute", zIndex: 0 }}>
      {/* Video absolute-positioned, rendering directly without placeholder image */}
      <video
        ref={videoRef}
        src="/assets/hero-working.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
      />
    </div>
  );
}

