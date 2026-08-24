import React, { Suspense } from "react"
import { Metadata } from "next"
import ProductsContent from "../ProductsContent"
import { getLatestApkInfo } from "@/lib/apk"

// Meta SEO Details for Active Pulse Product Route
export const metadata: Metadata = {
  title: "Active Pulse Workspace Hardware & Companion App | SkillForge Technologies",
  description: "Discover Active Pulse by SkillForge Technologies. Compact ESP32-C3 hardware BLE controller & companion Android app for smart workspace automation.",
  keywords: [
    "Active Pulse Device",
    "Active Pulse App",
    "ESP32-C3 HID controller",
    "Wireless mouse controller",
    "OTA firmware flash ESP32",
    "Bluetooth mouse simulator",
    "SkillForge Technologies products",
    "Workspace automation hardware",
    "Private BLE controller"
  ],
  openGraph: {
    title: "Active Pulse — Engineered for the Modern Workspace",
    description: "Intelligent wireless control. Seamless OTA updates. Zero compromises.",
    url: "https://skillforgetechnology.app/products/active-pulse",
    siteName: "SkillForge Technologies",
    images: [
      {
        url: "/Product/app_logo.png",
        width: 512,
        height: 512,
        alt: "Active Pulse Workspace Product Brand Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Active Pulse Workspace Hardware & App",
    description: "Intelligent wireless mouse simulator and dashboard application powered by ESP32-C3.",
    images: ["/Product/app_logo.png"]
  }
}

export const dynamic = "force-dynamic"

export default function ActivePulseProductPage() {
  const { fileName, version } = getLatestApkInfo()

  // Structured Data Schema for Google SEO (Product & Software)
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://skillforgetechnology.app/products/active-pulse#device",
        "name": "Active Pulse Hardware Device",
        "image": "https://skillforgetechnology.app/Product/app_logo.png",
        "description": "A compact, ultra-light intelligent BLE mouse controller built on the ESP32-C3 SuperMini platform for smart workspace window management and clicking.",
        "brand": {
          "@type": "Brand",
          "name": "SkillForge Technologies"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Alex Carter"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "24"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "439.00",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "50.00",
              "currency": "INR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 2,
                "maxValue": 5,
                "unitCode": "DAY"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 10,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://skillforgetechnology.app/products/active-pulse#app",
        "name": "Active Pulse Companion App",
        "operatingSystem": "Android 8.0+",
        "applicationCategory": "BusinessApplication",
        "downloadUrl": `https://skillforgetechnology.app/Product/${fileName}`,
        "description": "Companion utility to configure, control, scanner-pair, and flash wireless OTA updates offline onto Active Pulse modules.",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      }
    ]
  }

  return (
    <>
      {/* Dynamic SEO JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-500 font-sans text-sm">Loading Products...</div>}>
        <ProductsContent apkFileName={fileName} apkVersion={version} />
      </Suspense>
    </>
  )
}
