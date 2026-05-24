import React from "react";
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { siteData, defaultSEO } from "./lib/siteData";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteData.domain),
  title: {
    default: defaultSEO.title,
    template: `%s | ${siteData.companyName}`,
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: [{ name: "Nagpur Cranes" }],
  robots: "index, follow",
  alternates: {
    canonical: siteData.domain, // Adjust to their domain if different
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteData.domain,
    title: "Nagpur Cranes | Premium Crane Rental & Lifting Services",
    description: defaultSEO.description,
    siteName: siteData.companyName,
    images: [
      {
        url: defaultSEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteData.companyName} Fleet Showcase`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagpur Cranes | Premium Crane Rental & Heavy Lifting India",
    description: defaultSEO.description,
    images: [defaultSEO.ogImage],
  },
};

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // Inject schema structured data for LocalBusiness & Services
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${siteData.domain}/#organization`,
          "name": siteData.companyName,
          "url": siteData.domain,
          "logo": `${siteData.domain}/assets/logo-icon.webp`,
          "image": `${siteData.domain}/assets/about-operations.webp`,
          "description": defaultSEO.description,
          "telephone": siteData.phone,
          "email": siteData.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot no. 1154 Ward no. 3 Dobinagar Wadadhamana Amaravati Road",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "postalCode": "440023",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "21.137795",
            "longitude": "78.950198"
          },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": siteData.phone,
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi", "Marathi"]
        }
      },
      {
        "@type": "Service",
        "serviceType": "Crane Rental Service",
        "provider": {
          "@id": `${siteData.domain}/#organization`
        },
        "areaServed": ["Maharashtra", "Madhya Pradesh", "Chhattisgarh", "Odisha", "Central India", "India"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Heavy Machinery and Crane Rentals",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Farana Pick & Carry Crane Rental",
                "description": "High-maneuverability farana cranes ranging from 15 to 30 tons."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Telescopic Mobile Crane Rental",
                "description": "Heavy-duty truck-mounted mobile cranes from 30 to 400 tons."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Lattice Boom Crawler Crane Rental",
                "description": "Heavy terrain lattice boom crawler cranes from 100 to 400 tons."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
