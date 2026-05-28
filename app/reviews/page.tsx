import React from "react";
import styles from "../components/TestimonialsSection.module.css";
import AddReviewButton from "../components/AddReviewButton";
import ReviewsClientGrid from "../components/ReviewsClientGrid";
import { getReviews } from "../lib/reviews";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Testimonials & Ratings | Nagpur Cranes",
  description: "Read real reviews, testimonials, and star ratings from our industrial and civil infrastructure clients across Central India.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  // Sort by rating descending so 5-star ratings come first by default
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);

  return (
    <main className={styles.section} style={{ paddingTop: "140px", minHeight: "100vh" }}>
      <div className={styles.bgPattern} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            Client <span>Testimonials</span>
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Real reviews, feedback, and star ratings from businesses who rely on Nagpur Cranes for their heavy lifting requirements.
          </p>
          <AddReviewButton />
        </div>

        {/* Dedicated reviews grid showing interactive sorting/filtering and all reviews */}
        <ReviewsClientGrid initialReviews={sortedReviews} isHomepage={false} />
      </div>
    </main>
  );
}
