import React from "react";
import type { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Heavy Lifting & Crane Safety Blog | Nagpur Cranes",
  description: "Read the latest guides, lifting calculators, engineering reviews, and industry crane safety standards from Nagpur Cranes' certified heavy operations desk.",
  keywords: [
    "crane safety blog India",
    "heavy lifting guides",
    "Nagpur crane operations",
    "rigging calculations",
    "crawler crane maintenance",
    "Farana crane guidelines",
    "crane industry news India",
    "heavy equipment tips Maharashtra",
    "safe crane operation guide",
  ],
};

export default function BlogListing() {
  return (
    <main className={styles.main}>
      <BlogListingClient />
    </main>
  );
}
