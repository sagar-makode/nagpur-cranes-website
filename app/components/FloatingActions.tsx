"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteData } from "../lib/siteData";
import styles from "./FloatingActions.module.css";

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="35"
      height="35"
      aria-hidden="true"
      fill="none"
    >
      <path
        fill="#25D366"
        d="M16 3C8.82 3 3 8.82 3 16c0 2.54.75 4.9 2.02 6.9L3 29l6.28-1.95A12.9 12.9 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
      />
      <path
        fill="#fff"
        d="M22.2 18.73c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.7.3 1.24.48 1.67.62.7.22 1.34.2 1.85.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"
      />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    <div className={styles.wrapper}>
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
        <WhatsAppIcon />
        <span className={styles.tooltip}>WhatsApp Chat</span>
      </Link>
    </div>
  );
}
