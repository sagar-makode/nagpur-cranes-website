import React from "react";
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { siteData } from "./lib/siteData";

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
  metadataBase: new URL("https://nagpurcranes.com"),
  title: `${siteData.companyName} - Premium Crane Rental Central India`,
  description: `${siteData.companyName} rents high-quality Crawler, Farana, and Mobile Telescopic cranes from 15 to 400 tons in Nagpur, Maharashtra, MP, Chhattisgarh, and Odisha. Certified safety first.`,
  keywords: [
    "crane rental Nagpur",
    "heavy lifting service Nagpur",
    "Farana crane rental",
    "crawler crane rental Maharashtra",
    "telescopic mobile crane rent",
    "NAGPUR CRANES",
    "Mahesh Tathe",
  ],
  authors: [{ name: siteData.owner }],
  robots: "index, follow",
  alternates: {
    canonical: "https://nagpurcranes.com", // Adjust to their domain if different
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nagpurcranes.com",
    title: `${siteData.companyName} - Premium Crane Rental`,
    description: "Get the best price on Crawler, Farana, and Mobile Telescopic crane rentals. 15 to 400 Ton fleets available in Maharashtra, Chhattisgarh, Odisha.",
    siteName: siteData.companyName,
    images: [
      {
        url: "/assets/about-operations.png",
        width: 1200,
        height: 630,
        alt: `${siteData.companyName} Fleet Showcase`,
      },
    ],
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
        "@id": "https://nagpurcranes.com/#organization",
        "name": siteData.companyName,
        "url": "https://nagpurcranes.com",
        "logo": "https://nagpurcranes.com/assets/logo.svg",
        "image": "https://nagpurcranes.com/assets/about-operations.png",
        "description": "Leading provider of crane rentals and heavy lifting services in Nagpur, Maharashtra, and across Central India.",
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
          "latitude": "21.1503",
          "longitude": "79.0044"
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
          "@id": "https://nagpurcranes.com/#organization"
        },
        "areaServed": ["Maharashtra", "Madhya Pradesh", "Chhattisgarh", "Odisha"],
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
