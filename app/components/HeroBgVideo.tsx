"use client";

import React, { useRef, useEffect } from "react";
import styles from "../page.module.css";
import { siteData } from "../lib/siteData";

export default function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set slow-motion playback
    video.playbackRate = 0.5;

    // Re-apply playback rate if the browser resets it on loop
    const handleRateReset = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    video.addEventListener("ratechange", handleRateReset);

    return () => {
      video.removeEventListener("ratechange", handleRateReset);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/assets/hero-working.mp4"
      poster="/assets/about-operations.webp"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={styles.heroBgVideo}
      title={`${siteData.companyName} - Heavy Equipment in Action`}
    />
  );
}
