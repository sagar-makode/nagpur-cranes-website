"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isPlaying) {
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Autoplay or user-click required:", err);
        });
      }
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekValue = parseFloat(e.target.value);
      const total = videoRef.current.duration || 1;
      videoRef.current.currentTime = (seekValue / 100) * total;
      setProgress(seekValue);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={styles.playerContainer}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-crane-lifting-cargo-containers-at-a-port-34320-large.mp4"
        className={styles.videoSource}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        playsInline
        loop
      />

      {/* Large Center Play Overlay */}
      {!isPlaying && (
        <button className={styles.centerPlayButton} onClick={togglePlay} aria-label="Play Video">
          <Play size={44} style={{ marginLeft: "4px", color: "var(--bg-primary)" }} />
        </button>
      )}

      {/* Glass Controls Bar */}
      <div className={`${styles.controlsBar} ${showControls ? styles.visible : ""}`}>
        {/* Progress Bar Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className={styles.seekBar}
          style={{ background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
        />

        <div className={styles.controlsRow}>
          <div className={styles.leftControls}>
            <button className={styles.controlButton} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button className={styles.controlButton} onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <span className={styles.timeLabel}>
              {currentTime} / {duration}
            </span>
          </div>

          <div className={styles.rightControls}>
            <div className={styles.tipNote}>
              <span>Supports Local `crane-working.mp4`</span>
            </div>
            <button className={styles.controlButton} onClick={toggleFullscreen} aria-label="Fullscreen">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
