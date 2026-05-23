import Link from "next/link";
import { Mail, Phone, MapPin, Shield, Settings } from "lucide-react";
import { siteData } from "../lib/siteData";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Company Pitch */}
        <div className={styles.footerColumn}>
          <div className={styles.brand}>
            <span className={styles.logoYellow}>Nagpur</span>
            <span className={styles.logoWhite}>Cranes</span>
          </div>
          <p className={styles.pitchText}>
            Central India's leading crane rental service provider. Offering high-capacity Crawler, Farana, and Mobile Telescopic cranes from 15 to 400 tons. Engineered for safety and maximum efficiency.
          </p>
          <div className={styles.certifications}>
            <div className={styles.certBadge}>
              <Shield size={16} className={styles.certIcon} />
              <span>Safety Certified Fleet</span>
            </div>
            <div className={styles.certBadge}>
              <Settings size={16} className={styles.certIcon} />
              <span>24/7 Technical Support</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Our Services</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/cranes/farana-cranes" className={styles.footerLink}>
                Farana Pick & Carry (15-30T)
              </Link>
            </li>
            <li>
              <Link href="/cranes/mobile-cranes" className={styles.footerLink}>
                Telescopic Mobile Cranes (30-400T)
              </Link>
            </li>
            <li>
              <Link href="/cranes/crawler-cranes" className={styles.footerLink}>
                Heavy lattice Crawler Cranes (100-400T)
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.footerLink}>
                Custom Rigging & Lift Plans
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & Tech */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Resources & Innovation</h3>
          <ul className={styles.footerLinks}>
            <li>
              <Link href="/blog" className={styles.footerLink}>
                Safety & Heavy Lifting Blog
              </Link>
            </li>
            <li>
              <Link href={siteData.quoteUrl} className={styles.footerLink}>
                Instant Project Rental Estimates
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Get In Touch</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIconContainer}>
                <Phone size={16} />
              </span>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Call {siteData.owner}</span>
                <Link href={`tel:${siteData.phone.replace(/\s+/g, "")}`} className={styles.contactValue}>
                  {siteData.phone}
                </Link>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIconContainer}>
                <Mail size={16} />
              </span>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Email Us</span>
                <Link href={`mailto:${siteData.email}`} className={styles.contactValue}>
                  {siteData.email}
                </Link>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIconContainer}>
                <MapPin size={16} style={{ marginTop: "4px" }} />
              </span>
              <div className={styles.contactDetail}>
                <span className={styles.contactLabel}>Office Address</span>
                <Link
                  href={siteData.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.addressValue}
                >
                  {siteData.address}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            © {currentYear} {siteData.companyName}. All rights reserved. Designed for elite SEO and mobile-first responsiveness.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/sitemap.xml">Sitemap</Link>
            <span className={styles.divider}>•</span>
            <Link href="/contact">Inquire</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
