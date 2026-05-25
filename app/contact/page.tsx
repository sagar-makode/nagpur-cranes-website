import React from "react";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import styles from "./contact.module.css";
import { defaultSEO, siteData } from "../lib/siteData";

export const metadata: Metadata = {
  title: "Get a Crane Rental Quote | Nagpur Cranes - Fast Service",
  description: "Contact Nagpur Cranes for competitive quotes on Farana, Mobile Telescopic, and heavy lattice Crawler cranes. Serving Maharashtra, MP, Chhattisgarh & Odisha.",
  alternates: {
    canonical: `${siteData.domain}/contact`,
  },
  keywords: [
    ...defaultSEO.keywords,
    "contact Nagpur Cranes",
    "crane rental quote Nagpur",
    "crane service phone number Nagpur",
    "hire cranes Maharashtra",
    "crane booking Nagpur",
    "crane service enquiry India",
    "free crane rental quote Maharashtra",
    "get crane quote Central India",
  ],
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <ContactClient />
    </main>
  );
}
