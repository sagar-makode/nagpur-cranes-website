"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, CheckCircle2, ChevronDown, Filter } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

interface Review {
  date: string;
  name: string;
  rating: number;
  comment: string;
}

interface ReviewsClientGridProps {
  initialReviews: Review[];
  isHomepage?: boolean;
}

export default function ReviewsClientGrid({ initialReviews, isHomepage = true }: ReviewsClientGridProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<"highest" | "lowest" | "recent">("highest");
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for display limit
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync state if initialReviews change
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  // Apply filters and sorting
  const filteredReviews = reviews
    .filter((review) => filterRating === "all" || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      if (sortBy === "recent") {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      }
      return 0;
    });

  // Calculate limits for homepage: 3 for mobile, 6 for laptop. For dedicated pages, show all.
  const limit = isMobile ? 3 : 6;
  const visibleReviews = isHomepage ? filteredReviews.slice(0, limit) : filteredReviews;
  const hasMore = isHomepage && filteredReviews.length > limit;

  return (
    <div className={styles.interactiveWrapper}>
      {/* Premium Filters & Sorting Controls - ONLY shown on dedicated page, not homepage */}
      {!isHomepage && (
        <div className={styles.controlsBar}>
          <div className={styles.filterGroup}>
            <Filter size={16} className={styles.filterIcon} />
            <span className={styles.filterLabel}>Filter:</span>
            <div className={styles.filterButtons}>
              <button
                onClick={() => setFilterRating("all")}
                className={`${styles.filterBtn} ${filterRating === "all" ? styles.activeFilter : ""}`}
              >
                All
              </button>
              {[5, 4, 3].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setFilterRating(stars)}
                  className={`${styles.filterBtn} ${filterRating === stars ? styles.activeFilter : ""}`}
                >
                  {stars} ★
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sortGroup}>
            <span className={styles.sortLabel}>Sort:</span>
            <div className={styles.selectWrapper}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={styles.sortSelect}
                aria-label="Sort Reviews"
              >
                <option value="highest">Highest Rating (5★ First)</option>
                <option value="recent">Most Recent</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <ChevronDown size={14} className={styles.selectArrow} />
            </div>
          </div>
        </div>
      )}

      {/* Grid Display */}
      {filteredReviews.length === 0 ? (
        <div className={styles.notice}>
          No approved reviews match the selected filter rating. Be the first to share your experience!
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {visibleReviews.map((review, index) => (
              <div className={styles.card} key={index}>
                <div>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={styles.starIcon}
                        style={{
                          opacity: i < review.rating ? 1 : 0.2,
                          fill: i < review.rating ? "#f59e0b" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <blockquote className={styles.comment}>
                    "{review.comment}"
                  </blockquote>
                </div>

                <div className={styles.footer}>
                  <div className={styles.reviewer}>
                    <cite className={styles.name}>{review.name}</cite>
                    <span className={styles.verified}>
                      <CheckCircle2 size={12} /> Verified Client
                    </span>
                  </div>
                  <time className={styles.date} dateTime={review.date}>
                    {review.date
                      ? new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Recent"}
                  </time>
                </div>
              </div>
            ))}
          </div>

          {/* View More Reviews Redirection Link (Shown on homepage only when there are more reviews) */}
          {isHomepage && hasMore && (
            <div className={styles.viewMoreContainer}>
              <Link href="/reviews" className={styles.viewMoreBtn} aria-label="View More Reviews">
                View More Reviews
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
