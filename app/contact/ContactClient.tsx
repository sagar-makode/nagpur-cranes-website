"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { siteData } from "../lib/siteData";
import styles from "./contact.module.css";

// Separate content wrapper that uses search params
function ContactContent() {
  const searchParams = useSearchParams();
  
  // State variables for form inputs
  const [formData, setFormData] = useState({
    location: "",
    name: "",
    phone: "",
    email: "",
    siteDetails: "",
    ton: "",
    craneType: "",
  });

  const [formErrors, setFormErrors] = useState({
    location: "",
    name: "",
    phone: "",
    ton: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill crane type from query parameter if present
  useEffect(() => {
    const craneParam = searchParams.get("crane");

    if (craneParam) {
      setFormData((prev) => ({ ...prev, craneType: craneParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleReset = () => {
    setFormData({
      location: "",
      name: "",
      phone: "",
      email: "",
      siteDetails: "",
      ton: "",
      craneType: "",
    });
    setFormErrors({
      location: "",
      name: "",
      phone: "",
      ton: "",
      email: "",
    });
    setErrorMsg("");
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    const errors = {
      location: "",
      name: "",
      phone: "",
      ton: "",
      email: "",
    };
    let hasError = false;

    // 1. Location Validation
    if (!formData.location.trim()) {
      errors.location = "Project site location is required.";
      hasError = true;
    }

    // 2. Name Validation
    if (!formData.name.trim()) {
      errors.name = "Your name or company name is required.";
      hasError = true;
    } else if (formData.name.trim().length < 3) {
      errors.name = "Please enter a valid name (minimum 3 characters).";
      hasError = true;
    }

    // 3. Phone Validation
    const phoneTrimmed = formData.phone.trim();
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    const phoneDigits = phoneTrimmed.replace(/[^0-9]/g, "");
    if (!phoneTrimmed) {
      errors.phone = "Phone number is required.";
      hasError = true;
    } else if (!phoneRegex.test(phoneTrimmed) || phoneDigits.length < 10) {
      errors.phone = "Please enter a valid mobile number (minimum 10 digits).";
      hasError = true;
    }

    // 4. Tonnage Validation
    if (!formData.ton.trim()) {
      errors.ton = "Required tonnage is required.";
      hasError = true;
    }

    // 5. Email Validation (Optional but must be valid if entered)
    const emailTrimmed = formData.email.trim();
    if (emailTrimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        errors.email = "Please enter a valid email address (e.g. engineer@project.com).";
        hasError = true;
      }
    }

    setFormErrors(errors);

    if (hasError) {
      setErrorMsg("Please correct the errors in the fields below.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Failed to send inquiry. Please try again.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.topSection}>
        <div className={styles.heroCard}>
          <span className="badge badge-amber">Contact Details</span>
          <h1 className={styles.title}>Let's Lift Your Project Together</h1>
          <p className={styles.subtitle}>
            Get in touch with <strong>{siteData.owner}</strong> for instant scheduling, fleet availability, specialized lifting designs, and competitive quotes across Central India.
          </p>
        </div>

        <div className={styles.contactCards}>
          <div className={styles.contactCard}>
            <a href={`tel:${siteData.phone.replace(/\s+/g, "")}`} className={styles.iconBox} aria-label="Call Direct Phone Line">
              <Phone size={20} />
            </a>
            <div className={styles.contactDetails}>
              <span>Direct Phone Line</span>
              <a href={`tel:${siteData.phone.replace(/\s+/g, "")}`}>{siteData.phone}</a>
            </div>
          </div>

          <div className={styles.contactCard}>
            <a href={`mailto:${siteData.email}`} className={styles.iconBox} aria-label="Send Official Email">
              <Mail size={20} />
            </a>
            <div className={styles.contactDetails}>
              <span>Official Email Address</span>
              <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
            </div>
          </div>

          <div className={styles.contactCard}>
            <a href={siteData.addressUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBox} aria-label="View Operational Headquarters Location">
              <MapPin size={20} />
            </a>
            <div className={styles.contactDetails}>
              <span>{siteData.addressLabel}</span>
              <a href={siteData.addressUrl} target="_blank" rel="noopener noreferrer">
                {siteData.address}
              </a>
            </div>
          </div>

          <div className={styles.trustBadge}>
            <ShieldCheck size={24} className={styles.trustIcon} />
            <div>
              <strong>100% Insured Fleet</strong>
              <p>Our heavy rigging assemblies and operators carry complete corporate insurance protection.</p>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.formSection}>
        <div className={styles.formCol}>
          {!isSubmitted ? (
            <form className={`${styles.form} glass-card`} onSubmit={handleSubmit} noValidate>
              <h2 className={styles.formTitle}>Rental Inquiry Form</h2>
              <p className={styles.formSubtitle}>Submit your site requirements and our expert team will deliver a customized quote.</p>

              {errorMsg && (
                <div className={styles.errorAlert}>
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="input-group">
                <label htmlFor="location">Project Site Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Wardha Road Metro Site"
                  className="input-field"
                  required
                />
                {formErrors.location && <span className={styles.fieldError}>{formErrors.location}</span>}
              </div>

              <div className="responsive-grid" style={{ gap: "20px" }}>
                <div className="input-group">
                  <label htmlFor="name">Name / Enterprise *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. L&T Infrastructure"
                    className="input-field"
                    required
                  />
                  {formErrors.name && <span className={styles.fieldError}>{formErrors.name}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    className="input-field"
                    required
                  />
                  {formErrors.phone && <span className={styles.fieldError}>{formErrors.phone}</span>}
                </div>
                <div className="input-group ton-group">
                  <label htmlFor="ton">Required Tonnage *</label>
                  <input
                    type="text"
                    id="ton"
                    name="ton"
                    value={formData.ton}
                    onChange={handleChange}
                    placeholder="e.g. 20 T, 15 T, 5-10 T"
                    className="input-field"
                    required
                  />
                  {formErrors.ton && <span className={styles.fieldError}>{formErrors.ton}</span>}
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. engineer@project.com"
                  className="input-field"
                />
                {formErrors.email && <span className={styles.fieldError}>{formErrors.email}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="siteDetails">Lift Specifications / Site Access details</label>
                <textarea
                  id="siteDetails"
                  name="siteDetails"
                  value={formData.siteDetails}
                  onChange={handleChange}
                  placeholder="Include ground conditions, height clearances, or specific hook radius challenges if known..."
                  rows={4}
                  className="input-field"
                  style={{ resize: "none" }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px" }} disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending Request..." : "Submit Quotation Request"}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className={`${styles.successCard} glass-card animate-fade-in`}>
              <CheckCircle className={styles.successIcon} size={56} />
              <h2>Quotation Inquiry Sent Successfully!</h2>
              <p>
                Thank you {formData.name}. Your lift requirements for {formData.location} have been registered.
              </p>

              <div className={styles.summaryList}>
                <div className={styles.summaryRow}>
                  <span>Project Location:</span>
                  <strong>{formData.location || "Not provided"}</strong>
                </div>
                {formData.siteDetails && (
                  <div className={styles.summaryRow}>
                    <span>Site Notes:</span>
                    <strong>{formData.siteDetails}</strong>
                  </div>
                )}
                {formData.ton && (
                  <div className={styles.summaryRow}>
                    <span>Required Tonnage:</span>
                    <strong>{formData.ton}</strong>
                  </div>
                )}
              </div>

              <p className={styles.successNextSteps}>
                Nagpur Cranes Team will review your request and contact you at {formData.phone} shortly with a detailed quote.
              </p>

              <button className="btn-primary" onClick={handleReset}>
                <span>Submit New Quote</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ContactClient() {
  return (
    <div className="container">
      {/* Wrap in Suspense to safely read search parameters on client side */}
      <Suspense fallback={<div style={{ textAlign: "center", padding: "100px", color: "var(--text-secondary)" }}>Loading contact form...</div>}>
        <ContactContent />
      </Suspense>

      {/* Dynamic map embed */}
      <section className={styles.mapSection}>
        <div className="map-container">
          <iframe
            src={siteData.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Contact Location"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=21.137795,78.950198"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MapPin size={18} />
            <span>Get Directions</span>
          </a>
        </div>
      </section>
    </div>
  );
}
