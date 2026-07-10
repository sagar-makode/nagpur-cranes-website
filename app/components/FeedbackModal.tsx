"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Star, Check } from "lucide-react";
import styles from "./FeedbackModal.module.css";
import { siteData } from "../lib/siteData";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset form states when modal is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
        setRating(5);
        setName("");
        setContact("");
        setComment("");
      }, 250); // Matches smooth transition delay
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setError("Please fill out both Name and Comment fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
          contact: contact.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit feedback.");
      }

      setSuccess(true);
      // Reset form fields
      setName("");
      setContact("");
      setComment("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        className={styles.modal} 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
      >
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className={styles.successState}>
            <div className={styles.successIconContainer}>
              <Check size={40} />
            </div>
            <h3 id="feedback-title">Thank You!</h3>
            <p>
              Your feedback and star rating have been submitted successfully. We appreciate your support in improving Nagpur Cranes!
            </p>
            <button className={styles.successCloseBtn} onClick={onClose}>
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h2 id="feedback-title">Rate Your Experience</h2>
              <p>Share your feedback with Nagpur Cranes to help us serve you better.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.ratingContainer}>
                <span className={styles.ratingLabel}>Select Rating</span>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = hoverRating !== null 
                      ? starValue <= hoverRating 
                      : starValue <= rating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        className={styles.starBtn}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        aria-label={`Rate ${starValue} out of 5 stars`}
                      >
                        <Star
                          className={`${styles.starIcon} ${
                            isFilled ? styles.starFilled : styles.starEmpty
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="feedback-name">Your Name / Enterprise *</label>
                <input
                  id="feedback-name"
                  type="text"
                  required
                  placeholder={siteData.owner}
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="feedback-contact">Mobile No. / Email (Optional)</label>
                <input
                  id="feedback-contact"
                  type="text"
                  placeholder={siteData.phone}
                  className={styles.input}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="feedback-comment">Comments / Suggestions *</label>
                <textarea
                  id="feedback-comment"
                  required
                  placeholder="Tell us about the crane performance, operators, safety, or customer service..."
                  className={`${styles.input} ${styles.textarea}`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {error && <span className={styles.errorText}>{error}</span>}

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} role="status" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
