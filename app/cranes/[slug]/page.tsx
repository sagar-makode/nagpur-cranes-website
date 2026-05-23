import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, HelpCircle, Phone, FileText } from "lucide-react";
import { getCranesData } from "../../lib/data";
import { siteData } from "../../lib/siteData";
import styles from "./cranes.module.css";

// Generate static params for 100% Static Site Generation
export async function generateStaticParams() {
  const cranes = getCranesData();
  return cranes.map((crane: any) => ({
    slug: crane.slug,
  }));
}

// Generate SEO dynamic metadata for search optimization
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cranes = getCranesData();
  const crane = cranes.find((c: any) => c.slug === params.slug);

  if (!crane) {
    return {
      title: `Crane Not Found - ${siteData.companyName}`,
    };
  }

  return {
    title: `${crane.title} Rentals - ${siteData.companyName}`,
    description: `Rent high-quality ${crane.title} with capacities of ${crane.capacity}. Competitively priced, certified, and fully insured across Central India.`,
    keywords: [`rent ${crane.slug}`, `${crane.slug} Nagpur`, `${crane.slug} Maharashtra`, `${crane.title} specs`],
  };
}

export default async function CranePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cranes = getCranesData();
  const crane = cranes.find((c: any) => c.slug === params.slug);

  if (!crane) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Back navigation link */}
        <div className={styles.backNav}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to Homepage</span>
          </Link>
        </div>

        <div className={styles.detailsGrid}>
          {/* Left: Product Images & Core Details */}
          <div className={styles.productMedia}>
            <div className={styles.imageCard}>
              <Image
                src={crane.image}
                alt={crane.title}
                width={600}
                height={450}
                className={styles.craneImage}
                priority
              />
              <div className={styles.capacityBadge}>{crane.capacity}</div>
            </div>
            
            <div className={styles.certifiedBadge}>
              <CheckCircle size={18} style={{ color: "var(--accent-primary)" }} />
              <span>Full Safety Certification & Load Charts provided prior to dispatch.</span>
            </div>
          </div>

          {/* Right: Technical Spec Sheets & Inquiry */}
          <div className={styles.productSpecs}>
            <span className="badge badge-amber">Equipment Catalog</span>
            <h1 className={styles.title}>{crane.title}</h1>
            <p className={styles.overview}>{crane.overview}</p>

            {/* Spec grid */}
            <div className={styles.specsTable}>
              <h3 className={styles.tableTitle}>Technical Parameters</h3>
              <div className={styles.tableRows}>
                {crane.specs.map((spec: any, idx: number) => (
                  <div key={idx} className={styles.tableRow}>
                    <span className={styles.specLabel}>{spec.label}</span>
                    <span className={styles.specValue}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Action Card */}
            <div className={styles.actionCard}>
              <h4>Get an Instant Estimate for this Crane</h4>
              <p>Let Mahesh Tathe structure the perfect rental deal for your site location and project duration.</p>
              <div className={styles.actionRow}>
                <Link href={`${siteData.quoteUrl}&crane=${crane.slug}`} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  <FileText size={18} />
                  <span>Request Rental Quote</span>
                </Link>
                <Link href={`tel:${siteData.phone.replace(/\s+/g, "")}`} className="btn-secondary" style={{ padding: "14px" }} aria-label="Call Operator">
                  <Phone size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Applications grids */}
        <section className={styles.extraSection}>
          <div className={styles.sectionSplit}>
            <div className={styles.splitColumn}>
              <h3>Key Operational Benefits</h3>
              <div className={styles.benefitsList}>
                {crane.benefits.map((ben: any, idx: number) => (
                  <div key={idx} className={styles.benefitItem}>
                    <div className={styles.bulletCheck}></div>
                    <div>
                      <strong>{ben.title}</strong>
                      <p>{ben.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.splitColumn}>
              <h3>Primary Applications</h3>
              <div className={styles.appsList}>
                {crane.applications.map((app: string, idx: number) => (
                  <div key={idx} className={styles.appItem}>
                    <CheckCircle size={18} className={styles.appIcon} />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
