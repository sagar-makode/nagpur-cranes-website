import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCranesData } from "../lib/data";
import styles from "./page.module.css";

export default function CranesListingPage() {
  const cranes = getCranesData();

  return (
    <main className={styles.main}>
      <div className="container">
        <section className={styles.heroSection}>
          <div className="section-header">
            <h1>Our Crane Fleet</h1>
            <p>Explore our full range of heavy lifting cranes available for rental in Nagpur and Central India.</p>
          </div>
        </section>

        <section className={styles.cranesSection}>
          <div className={`responsive-grid ${styles.cranesGrid}`}>
            {cranes.map((crane: any) => (
              <article key={crane.slug} className="glass-card">
                <div className={styles.craneCardImageContainer}>
                  <Image
                    src={crane.image}
                    alt={crane.title}
                    width={400}
                    height={280}
                    className={styles.craneCardImage}
                  />
                  <div className={styles.craneCapacityBadge}>{crane.capacity}</div>
                </div>
                <div className={styles.craneCardContent}>
                  <h3>{crane.title}</h3>
                  <p className={styles.craneCardCaption}>{crane.caption}</p>
                  <div className={styles.craneCardActions}>
                    <Link href={`/cranes/${crane.slug}`} className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                      <span>View Full Specs</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
