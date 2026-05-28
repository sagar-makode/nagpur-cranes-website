import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, User, Briefcase, Droplets, Anchor, Gem, Cpu, Compass, Activity, Eye, MapPin } from "lucide-react";
import HeroBgVideo from "./components/HeroBgVideo";
import ScrollReveal from "./components/ScrollReveal";
import CountUp from "./components/CountUp";
import {
  CrawlerCraneIcon,
  TruckCraneIcon,
  LoadHookIcon,
  CertifiedShieldIcon,
  TelescopicBoomIcon,
  WindTurbineIcon,
} from "./components/CraneIcons";
import { getCranesData, getBlogPosts } from "./lib/data";
import { siteData, defaultSEO } from "./lib/siteData";
import type { Metadata } from "next";
import styles from "./page.module.css";
import TestimonialsSection from "./components/TestimonialsSection";

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  alternates: {
    canonical: siteData.domain,
  },
  openGraph: {
    type: "website",
    url: siteData.domain,
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [
      {
        url: defaultSEO.ogImage,
        width: 1200,
        height: 630,
        alt: "Nagpur Cranes | Premium Crane Service in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [defaultSEO.ogImage],
  },
};

export default function Home() {
  const cranes = getCranesData();
  const blogPosts = getBlogPosts();

  return (
    <main className={styles.main}>
      {/* 1. Hero / Header Section — Full Cinematic Video Background */}
      <section className={styles.heroSection}>
        {/* Slow-motion background video (0.5x speed, client component) */}
        <HeroBgVideo />
        {/* Multi-directional dark overlay — heavy on left for text legibility */}
        <div className={styles.heroBgOverlay} />
        {/* Centered content on top of video */}
        <div className={styles.heroContainer}>
          <div className={`${styles.heroContent} animate-fade-in`}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span>NAGPUR CRANES</span>
            </div>
            <h1 className={styles.heroTitle}>
              Elite Heavy Lifting &<br /><span className={styles.gradientText}>Crane Rentals</span>
            </h1>
            <p className={styles.heroDescription}>
              Providing high-performance, safety-certified Crawler, Farana, and Mobile Telescopic cranes ranging from 15 to 400 tons across Maharashtra, MP, Chhattisgarh, and Odisha.
            </p>
            <div className={styles.heroActions}>
              <Link href={siteData.quoteUrl} className="btn-primary">
                <span>Instant Quote Request</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="#cranes-section" className="btn-secondary">
                <span>View Our Fleet</span>
              </Link>
            </div>
          </div>

        </div>
        


      </section>

      {/* Upgraded stats section with CountUp + crane icons */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <ScrollReveal delay={0}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrap}>
                  <CrawlerCraneIcon size={40} className={styles.statIcon} />
                </div>
                <div className={styles.statInfo}>
                  <h4>15T – <CountUp to={400} suffix="T" /></h4>
                  <p>Lift Capacity Range</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrap}>
                  <CertifiedShieldIcon size={40} className={styles.statIcon} />
                </div>
                <div className={styles.statInfo}>
                  <h4><CountUp to={100} suffix="%" /></h4>
                  <p>Safety Certified Fleet</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrap}>
                  <TelescopicBoomIcon size={40} className={styles.statIcon} />
                </div>
                <div className={styles.statInfo}>
                  <h4><CountUp to={4} suffix="+ States" /></h4>
                  <p>Operational Coverage</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrap}>
                  <LoadHookIcon size={40} className={styles.statIcon} />
                </div>
                <div className={styles.statInfo}>
                  <h4>24 / 7</h4>
                  <p>Site Support Always</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Cranes Catalog Grid Section */}
      <section id="cranes-section" className={styles.cranesSection}>
        <div className="container">
          <div className="section-header">
            <h2>Our Specialized Crane Fleet</h2>
            <p>Select the ideal model optimized for your specific engineering, lifting, or industrial transport needs.</p>
          </div>
          <div className={`responsive-grid ${styles.cranesGrid}`}>
            {cranes.map((crane: any, index: number) => (
              <div key={crane.slug} className="glass-card">
                <div className={styles.craneCardImageContainer}>
                  <Image
                    src={crane.image}
                    alt={crane.title}
                    width={400}
                    height={280}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 2}
                    className={styles.craneCardImage}
                  />
                  <div className={styles.craneCapacityBadge}>{crane.capacity}</div>
                </div>
                <div className={styles.craneCardContent}>
                  <h3>{crane.title}</h3>
                  <p className={styles.craneCardCaption}>{crane.caption}</p>
                  <div className={styles.craneCardActions}>
                    <Link href={`/cranes/${crane.slug}`} className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                      <span>Details & Specifications</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Industry Sectors — crane SVG icons + ScrollReveal stagger */}
      <section className={styles.sectorsSection}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2>Industrial Sectors We Serve</h2>
              <p>Safety-certified, high-precision crane machinery for diverse industrial and infrastructure needs.</p>
            </div>
          </ScrollReveal>
          <div className={styles.sectorsGrid}>
            <ScrollReveal delay={0}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/sector-construction.webp"
                  alt="Infrastructure & Construction Lifting"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <TruckCraneIcon size={28} />
                  </div>
                  <h3>Infrastructure & Construction</h3>
                  <p>Heavy hoisting for flyovers, metros, bridges, high-rise buildings, and complex civil engineering works.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/sector-wind.webp"
                  alt="Wind & Renewable Energy Lifting"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <WindTurbineIcon size={28} />
                  </div>
                  <h3>Wind & Renewable Energy</h3>
                  <p>Lattice boom crawlers for precise erection of wind turbines, blades, and massive wind farm towers.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/sector-refinery.webp"
                  alt="Oil, Gas & Refineries Industrial Lifting"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <Droplets size={28} />
                  </div>
                  <h3>Oil, Gas & Refineries</h3>
                  <p>Industrial rigging for column installations, modular assembly, and petrochemical shutdown maintenance.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/about-operations.webp"
                  alt="Shipping, Marine & Ports Lifting"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <Anchor size={28} />
                  </div>
                  <h3>Shipping, Marine & Ports</h3>
                  <p>Portside cargo handling, marine shipyard assemblies, and drydock operations support.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/cta-background.webp"
                  alt="Metals, Cement & Mining Operations"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <Gem size={28} />
                  </div>
                  <h3>Metals, Cement & Mining</h3>
                  <p>Lifting draglines, stacker-reclaimers, ore crushers, and supporting 24×7 mining operations.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className={`${styles.sectorCard} ${styles.hasBgImage}`}>
                <Image
                  src="/assets/team-operator.webp"
                  alt="Power Plant Turnarounds Lifting"
                  fill
                  className={styles.sectorCardBg}
                />
                <div className={styles.sectorCardOverlay} />
                <div className={styles.sectorCardContent}>
                  <div className={styles.sectorIconBox}>
                    <Cpu size={28} />
                  </div>
                  <h3>Power Plant Turnarounds</h3>
                  <p>Turbine hoisting, heavy boiler placements, generator assembly, and thermal shutdown lifts.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map location embed */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className="section-header">
            <h2>Our Operational Headquarters</h2>
            <p>Strategically stationed on Amaravati Road to serve Central India rapidly.</p>
          </div>
          <div className="map-container">
            <iframe
              src={siteData.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${siteData.companyName} Location Map`}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <Link
              href="https://www.google.com/maps/dir/?api=1&destination=21.137795,78.950198"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MapPin size={18} />
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Competitor Beating Asset: Turnkey Solutions & Associated Sales */}
      <section className={styles.solutionsSection}>
        <div className="container">
          <div className="section-header">
            <h2>Turnkey Lifting Solutions & Equipment</h2>
            <p>Beyond crane leasing, we offer end-to-end engineered lifting assistance and heavy equipment operations.</p>
          </div>
          <div className={styles.solutionsGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIconBox}>
                <Compass size={22} />
              </div>
              <h3>Rigging & CAD Lift Plans</h3>
              <p>Simulating load trajectories, calculating crane boom configurations, analyzing ground bearing pressure, and dynamic balancing via CAD design.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIconBox}>
                <Activity size={22} />
              </div>
              <h3>Access Platforms (AWP)</h3>
              <p>Renting out robust cherry pickers, articulating boom lifts, and heavy-duty scissor lifts ranging from 10 to 45 meters for height tasks.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIconBox}>
                <Briefcase size={22} />
              </div>
              <h3>New & Pre-Owned Sales</h3>
              <p>Procuring, quality-testing, and selling highly maintained lattice crawlers, telescopic truck cranes, and pick-and-carry faranas.</p>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIconBox}>
                <Eye size={22} />
              </div>
              <h3>Real-Time Fleet Telematics</h3>
              <p>Every vehicle features active GPS tracking, load moment indicator telemetry, automated time sheet logs, and structural safety audits.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 5. SEO Blog Preview list */}
      <section className={styles.blogSection}>
        <div className="container">
          <div className="section-header">
            <h2>The Heavy Lifting Resource Hub</h2>
            <p>Expert articles and updates on safety guidelines, crane selecting, and infrastructure engineering.</p>
          </div>
          <div className={`responsive-grid ${styles.blogGrid}`}>
            {blogPosts.map((post: any) => (
              <article key={post.slug} className="glass-card">
                <div className={styles.blogCardContent}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogCategory}>{post.category}</span>
                    <span className={styles.blogDot}>•</span>
                    <span className={styles.blogReadTime}>{post.readTime}</span>
                  </div>
                  <h3 className={styles.blogTitle}>
                    <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
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
        </div>
      </section>

      {/* 6. Dynamic Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Interactive Call-To-Action (CTA) */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2>Ready to Power Up Your Site Operations?</h2>
              <p>Contact Nagpur Cranes for customized lift designs, machinery consultations, and instant pricing quotes.</p>
              <div className={styles.ctaActions}>
                <Link href={siteData.quoteUrl} className="btn-primary" style={{ background: "#ffffff", color: "var(--brand-600)" }}>
                  <span>Request Rental Quotation</span>
                </Link>
                <Link href={`tel:${siteData.phone.replace(/\s+/g, "")}`} className="btn-secondary" style={{ borderColor: "rgba(255, 255, 255, 0.3)", color: "#ffffff", background: "rgba(255, 255, 255, 0.05)" }}>
                  <Phone size={18} />
                  <span>Call {siteData.phone}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}

// Inline Phone icon import for fallback
function Phone({ size, ...props }: { size: number; [key: string]: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
