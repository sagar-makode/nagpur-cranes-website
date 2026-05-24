"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, User, Clock, ArrowRight, AlertCircle } from "lucide-react";
import postsData from "../../content/blog-posts.json";
import styles from "./blog.module.css";

export default function BlogListingClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const list = new Set(postsData.map((post) => post.category));
    return ["All", ...Array.from(list)];
  }, []);

  const filteredPosts = useMemo(() => {
    return postsData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container">
      {/* Blog header intro */}
      <section className={styles.blogHeader}>
        <span className="badge badge-amber">Resource Hub</span>
        <h1 className={styles.blogTitle}>The Heavy Lifting Resource Hub</h1>
        <p className={styles.blogSubtitle}>
          Read safety articles, machinery spec comparisons, maintenance guides, and project spotlights written by Nagpur's leading hoisting professionals.
        </p>
      </section>

      {/* Filter and search bar section */}
      <section className={styles.filterSection}>
        {/* Categories select row */}
        <div className={styles.categoriesRow}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryBtn} ${selectedCategory === category ? styles.categoryActive : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search box input */}
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search articles by title, keywords, safety specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </section>

      {/* Blog listing grid */}
      {filteredPosts.length > 0 ? (
        <div className="responsive-grid" style={{ marginTop: "40px", gap: "24px" }}>
          {filteredPosts.map((post) => (
            <article key={post.slug} className="glass-card animate-fade-in">
              <div className={styles.blogCardContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.blogCategory}>{post.category}</span>
                  <span className={styles.blogDot}>•</span>
                  <span className={styles.blogReadTime}>{post.readTime}</span>
                </div>
                <h2 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
                    {post.title}
                  </Link>
                </h2>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                
                {/* Keywords tags row */}
                <div className={styles.keywordsRow}>
                  {post.keywords.slice(0, 3).map((keyword, i) => (
                    <span key={i} className={styles.keywordTag}>
                      #{keyword}
                    </span>
                  ))}
                </div>

                <div className={styles.blogFooter}>
                  <div className={styles.blogAuthor}>
                    <User size={14} style={{ color: "var(--accent-primary)" }} />
                    <span>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className={styles.blogReadBtn}>
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.noResultsCard}>
          <AlertCircle size={40} className={styles.noResultsIcon} />
          <h3>No Articles Found</h3>
          <p>We couldn't find any safety posts or guidelines matching "{searchQuery}". Try searching with different keywords.</p>
          <button className="btn-secondary" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
