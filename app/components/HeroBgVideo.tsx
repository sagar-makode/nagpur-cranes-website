"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { siteData } from "../lib/siteData";

export default function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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

    // Second line of defense: Safety timeout of 8.0s starting from the moment video mounts.
    // Gives moderate/slow connections ample time to buffer and start playing, preventing premature fallback.
    timeoutRef.current = setTimeout(() => {
      console.log("Video playback stalled or failed to start within 8s. Falling back to WebP banner.");
      setVideoState("fallback");
    }, 8000);

    const video = videoRef.current;
    if (!video) return;

    // Enforce 0.5x speed on mount just in case metadata already loaded
    video.playbackRate = 0.5;

    // Re-apply playback rate if the browser resets it on loop
    const handleRateChange = () => {
      if (video.playbackRate !== 0.5) {
        video.playbackRate = 0.5;
      }
    };

    // Safe fallback interaction listener to boot playback if browser policies block native autoplay
    const handleInteraction = () => {
      if (video && video.paused) {
        video.play()
          .then(() => {
            console.log("Interactive backup playback booted successfully.");
          })
          .catch((err) => {
            console.log("Interactive play backup was blocked:", err);
          });
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    video.addEventListener("ratechange", handleRateChange);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      video.removeEventListener("ratechange", handleRateChange);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [shouldLoadVideo]);

  const handlePlaying = () => {
    console.log("Hero background video playing. Transitioning visual layer.");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVideoState("playing");
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
          opacity: videoState === "playing" ? 0 : 1,
          transition: "opacity 1.2s ease-in-out",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      {/* Video absolute-positioned over image, starts invisible (opacity 0) and fades in smoothly once playing */}
      {shouldLoadVideo && videoState !== "fallback" && (
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
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 0.5;
          }}
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
      )}
    </div>
  );
}
