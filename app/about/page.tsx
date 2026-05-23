import Link from "next/link";
import { Mail, Phone, MapPin, User, Compass } from "lucide-react";
import { aboutData, siteData } from "../lib/siteData";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <section className={styles.heroSection}>
          <div className={styles.heroHeader}>
            <span className="badge badge-amber">About Us</span>
            <h1>{aboutData.heading}</h1>
            <p>{aboutData.subtitle}</p>
          </div>
          <div className={styles.heroActions}>
            <Link href={siteData.quoteUrl} className="btn-primary">
              <span>Request A Quote</span>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.grid}>
            <div className={styles.textBlock}>
              <h2>Who We Are</h2>
              <p>{aboutData.description}</p>
              <p>{aboutData.mission}</p>
              <p>{aboutData.safety}</p>
            </div>

            <div className={styles.contactBlock}>
              <div className={styles.commitmentIntro}>
                <p>{aboutData.commitmentIntro}</p>
              </div>
              <div className={styles.commitmentsGrid}>
                {aboutData.commitments.map((item) => (
                  <div key={item.title} className={styles.pillarCard}>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactBlockWrap}>
            <div className={styles.contactCard}>
              <div className={styles.contactTitle}>
                <User size={22} />
                <div>
                  <h3>Contact Us</h3>
                  <p>{siteData.owner}</p>
                </div>
              </div>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Phone size={18} />
                  <div>
                    <span>Call</span>
                    <Link href={`tel:${siteData.phone.replace(/\s+/g, "")}`}>{siteData.phone}</Link>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={18} />
                  <div>
                    <span>Mail</span>
                    <Link href={`mailto:${siteData.email}`}>{siteData.email}</Link>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <MapPin size={18} />
                  <div>
                    <span>Location</span>
                    <Link href={siteData.addressUrl} target="_blank" rel="noreferrer">
                      {siteData.address}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
