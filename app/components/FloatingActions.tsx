"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Phone, ChevronUp } from "lucide-react";
import { siteData } from "../lib/siteData";
import styles from "./FloatingActions.module.css";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`${styles.actionButton} ${styles.scrollTop} ${showScroll ? styles.visible : ""}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </button>

      {/* Direct Phone Call */}
      <Link
        href={`tel:${siteData.phone.replace(/\s+/g, "")}`}
        className={`${styles.actionButton} ${styles.phone}`}
        aria-label={`Call ${siteData.companyName}`}
      >
        <Phone size={20} />
        <span className={styles.tooltip}>Call Now</span>
      </Link>

      {/* WhatsApp Message */}
      <Link
        href={siteData.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionButton} ${styles.whatsapp}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={20} />
        <span className={styles.tooltip}>WhatsApp Chat</span>
      </Link>
    </div>
  );
}
