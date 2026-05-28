"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import FeedbackModal from "./FeedbackModal";
import styles from "./TestimonialsSection.module.css";

export default function AddReviewButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.addReviewBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Write a Review"
      >
        <Star size={18} />
        <span>Write a Review</span>
      </button>
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
