"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, PenTool, Home, Briefcase, User } from "lucide-react";
import { siteData } from "../lib/siteData";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Cranes", href: "/cranes", icon: Briefcase },
    { name: "Blog", href: "/blog", icon: PenTool },
    { name: "Contact", href: "/contact", icon: PhoneCall },
  ];

  const getIsActive = (linkHref: string) => {
    if (linkHref === "/") {
      return pathname === "/";
    }

    return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoYellow}>NAGPUR</span>
          <span className={styles.logoWhite}>CRANES</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = getIsActive(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Action Button */}
        <div className={styles.actionBtn}>
          <Link href={siteData.quoteUrl} className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
            <PhoneCall size={16} />
            <span>Request Quote</span>
          </Link>
        </div>

        {/* Hamburger Trigger */}
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = getIsActive(link.href);
            return (
              <li key={link.name} className={styles.mobileNavItem}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ""}`}
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
          <li className={styles.mobileNavItem} style={{ marginTop: "24px", listStyle: "none" }}>
            <Link
              href={siteData.quoteUrl}
              onClick={() => setIsOpen(false)}
              className="btn-primary"
              style={{ width: "100%", textAlign: "center" }}
            >
              <PhoneCall size={18} />
              <span>Get Free Estimate</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
