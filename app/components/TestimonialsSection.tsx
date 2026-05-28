import React from "react";
import styles from "./TestimonialsSection.module.css";
import AddReviewButton from "./AddReviewButton";
import ReviewsClientGrid from "./ReviewsClientGrid";
import { staticReviews } from "../lib/staticReviews";

export default function TestimonialsSection() {
  // Sort by rating descending so 5-star ratings come first by default
  const sortedReviews = [...staticReviews].sort((a, b) => b.rating - a.rating);

  return (
    <section className={styles.section} id="reviews">
      <div className={styles.bgPattern} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            What Our <span>Clients Say</span>
          </h2>
          <p>
            Real feedback from businesses and project managers who rely on Nagpur Cranes for their heavy lifting requirements.
          </p>
          <AddReviewButton />
        </div>

        <ReviewsClientGrid initialReviews={sortedReviews} />
      </div>
    </section>
  );
}
