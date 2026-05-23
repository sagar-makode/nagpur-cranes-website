import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Calendar, Clock, Bookmark, ArrowRight, ShieldAlert, Award } from "lucide-react";
import { getBlogPosts } from "../../lib/data";
import { siteData } from "../../lib/siteData";
import styles from "./post.module.css";

// Generate static params for 100% Static Site Generation
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Generate SEO dynamic metadata for search optimization
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = getBlogPosts();
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found - NAGPUR CRANES",
    };
  }

  return {
    title: `${post.title} | ${siteData.companyName} Blog`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const posts = getBlogPosts();
  const post = posts.find((p: any) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get recommended posts (excluding the current one)
  const recommendations = posts.filter((p: any) => p.slug !== post.slug).slice(0, 2);

  // Inject Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nagpurcranes.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": "https://nagpurcranes.com/assets/about-operations.png",
    "datePublished": "2026-05-10T12:00:00+05:30", // Fallback or dynamic
    "dateModified": "2026-05-23T12:00:00+05:30",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://nagpurcranes.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteData.companyName,
      "logo": {
        "@type": "ImageObject",
        "url": "https://nagpurcranes.com/assets/logo.svg"
      }
    }
  };

  return (
    <main className={styles.main}>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className={styles.backNav}>
          <Link href="/blog" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Resource Hub</span>
          </Link>
        </div>

        <div className={styles.articleLayout}>
          {/* Left: Main SEO Rich Article Content */}
          <article className={styles.article}>
            <header className={styles.articleHeader}>
              <div className={styles.metaRow}>
                <span className={styles.categoryBadge}>{post.category}</span>
                <span className={styles.divider}>•</span>
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <span className={styles.divider}>•</span>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h1 className={styles.articleTitle}>{post.title}</h1>
              
              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  <User size={18} style={{ color: "var(--bg-primary)" }} />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{post.author}</span>
                  <span className={styles.authorTitle}>Fleet Director, NAGPUR CRANES</span>
                </div>
              </div>
            </header>

            {/* Render HTML content safely */}
            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Keyword tags footer */}
            <footer className={styles.articleFooter}>
              <div className={styles.tagsContainer}>
                {post.keywords.map((keyword: string, idx: number) => (
                  <span key={idx} className={styles.tag}>
                    #{keyword}
                  </span>
                ))}
              </div>
            </footer>
          </article>

          {/* Right: Premium Dynamic Sidebar */}
          <aside className={styles.sidebar}>
            {/* Direct Consultation Widget */}
            <div className={styles.widgetCard}>
              <div className={styles.widgetGlow}></div>
              <div className={styles.widgetContent}>
                <Award className={styles.widgetIcon} size={24} />
                <h3>Need Heavy Rigging Advice?</h3>
                <p>Mahesh Tathe provides free onsite consultations for construction, flyovers, and industrial plants across Central India.</p>
                <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Book Free Consultation</span>
                </Link>
              </div>
            </div>

            {/* Recommended Articles Widget */}
            <div className={styles.widgetCardPlain}>
              <h3 className={styles.widgetTitle}>Recommended Reading</h3>
              <div className={styles.recList}>
                {recommendations.map((rec: any) => (
                  <div key={rec.slug} className={styles.recItem}>
                    <span className={styles.recCategory}>{rec.category}</span>
                    <h4>
                      <Link href={`/blog/${rec.slug}`} className={styles.recLink}>
                        {rec.title}
                      </Link>
                    </h4>
                    <Link href={`/blog/${rec.slug}`} className={styles.recReadLink}>
                      <span>Read Now</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Commitment Widget */}
            <div className={styles.widgetCardPlain}>
              <div className={styles.safetyHeader}>
                <ShieldAlert size={18} style={{ color: "var(--accent-primary)" }} />
                <h3>Zero-Accident Mission</h3>
              </div>
              <p className={styles.safetyText}>
                Our cranes are equipped with real-time safe load indicators. Every machine undergoes structural welds NDT audits and is certified prior to deployment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
