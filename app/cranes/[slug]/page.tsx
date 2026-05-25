import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, HelpCircle, Phone, FileText } from "lucide-react";
import { getCranesData } from "../../lib/data";
import { siteData, defaultSEO } from "../../lib/siteData";
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
      title: `Crane Not Found | ${siteData.companyName}`,
    };
  }

  const titleLower = crane.title.toLowerCase();
  const baseDescription = `Premium ${crane.title} rental services in India. Nagpur Cranes offers safety-certified ${crane.title} fleets with capacities up to ${crane.capacity}. Contact us for competitive rates.`;

  // Generate rich, unique crane-specific keywords based on the actual crane data
  const craneKeywords: Record<string, string[]> = {
    "farana-cranes": [
      "farana crane rental Nagpur",
      "farana pick and carry crane hire",
      "15 ton crane rental Maharashtra",
      "30 ton farana crane India",
      "pick and carry crane Nagpur",
      "farana crane for construction",
      "farana crane for factory yard",
      "small crane rental Nagpur",
      "farana crane service Central India",
      "compact crane hire Maharashtra",
    ],
    "mobile-cranes": [
      "mobile crane rental Nagpur",
      "telescopic crane hire Maharashtra",
      "400 ton crane rental India",
      "mobile crane for bridge construction",
      "telescopic boom crane Nagpur",
      "heavy mobile crane hire Central India",
      "all terrain crane rental Maharashtra",
      "30 ton to 400 ton crane hire India",
      "mobile crane for windmill installation",
      "hydraulic mobile crane Nagpur",
    ],
    "crawler-cranes": [
      "crawler crane rental Nagpur",
      "lattice boom crane hire India",
      "100 ton crawler crane Maharashtra",
      "400 ton heavy crawler crane India",
      "crawler crane for power plant",
      "crawler crane for refinery India",
      "heavy lattice crane hire Nagpur",
      "crawler crane for dam construction",
      "tracked crane rental Central India",
      "crawler crane service Chhattisgarh",
    ],
    "boom-lifter": [
      "boom lifter rental Nagpur",
      "aerial work platform hire Maharashtra",
      "telescopic boom lift 185 feet India",
      "self propelled boom lift Nagpur",
      "boom lift for industrial maintenance",
      "aerial platform rental Central India",
      "boom lift hire construction Maharashtra",
      "JLG boom lift rental Nagpur",
      "man lift rental Maharashtra",
      "high reach boom lift India",
    ],
    "hydra-cranes": [
      "hydra crane rental Nagpur",
      "hydra pick and carry crane Maharashtra",
      "14 ton hydra crane hire India",
      "20 ton hydra crane Nagpur",
      "hydra crane for warehouse",
      "hydra crane service Central India",
      "hydraulic pick carry crane Nagpur",
      "hydra crane for factory yard",
      "small hydra crane hire Maharashtra",
      "hydra crane daily rate Nagpur",
    ],
  };

  return {
    title: `${crane.title} Rentals | Nagpur Cranes - ${crane.capacity}`,
    description: baseDescription,
    alternates: {
      canonical: `${siteData.domain}/cranes/${crane.slug}`,
    },
    keywords: [
      ...defaultSEO.keywords,
      `rent ${titleLower}`,
      `${titleLower} in nagpur`,
      `${titleLower} service in maharashtra`,
      `${titleLower} hire india`,
      `${crane.capacity} crane rental nagpur`,
      ...(craneKeywords[crane.slug] || []),
    ],
    openGraph: {
      title: `${crane.title} Rentals | Nagpur Cranes`,
      description: baseDescription,
      url: `${siteData.domain}/cranes/${crane.slug}`,
      images: [
        {
          url: crane.image,
          width: 1200,
          height: 630,
          alt: `${crane.title} Specs - Nagpur Cranes`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${crane.title} Rentals | Nagpur Cranes`,
      description: baseDescription,
      images: [crane.image],
    },
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
              <p>Let Nagpur Cranes structure the perfect rental deal for your site location and project duration.</p>
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
