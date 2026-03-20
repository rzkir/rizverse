import { metadata } from "@/base/Meta/Metadata";

import { geistSans, geistMono } from "@/base/Fonts/Fonts";

import "@/base/style/globals.css";

import Script from "next/script";

import Header from "@/base/layout/Header";

import Footer from "@/base/layout/Footer";

import LenisProvider from "@/base/helper/LenisProvider";

import { ThemeProvider } from "@/context/ThemaContext";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import { cookies, headers } from 'next/headers'

export { metadata };
interface RootLayoutProps {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const localeCookie = cookieStore.get("locale")?.value as "id" | "en" | undefined;
  const acceptLanguage = headersList.get("accept-language") || "";
  const firstLang = acceptLanguage.split(",")[0]?.trim().split("-")[0]?.toLowerCase();

  let locale: "id" | "en" = localeCookie || (firstLang === "id" ? "id" : "en");

  if (params) {
    try {
      const resolvedParams = await params;
      if (resolvedParams?.locale) {
        locale = resolvedParams.locale as "id" | "en";
      }
    } catch { }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
    ]
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rizverse",
              "url": "https://rizverse.my.id",
              "logo": "https://rizverse.my.id/favicon.ico",
              "description": "Rizverse adalah platform entertainment terdepan yang menghadirkan ribuan judul anime, donghua, manga, dan film berkualitas tinggi. Download aplikasi mobile dan desktop kami untuk pengalaman streaming terbaik.",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "Rizverse Team"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Platform Entertainment",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Anime Streaming"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Donghua Streaming"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Manga Reader"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Film Streaming"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://twitter.com/rizverse",
                "https://instagram.com/rizverse",
                "https://facebook.com/rizverse",
                "https://tiktok.com/@rizverse"
              ]
            }),
          }}
          strategy="afterInteractive"
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd)
          }}
          strategy="afterInteractive"
        />
        <Script
          id="sitelinks-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rizverse",
              "url": "https://rizverse.my.id",
              "description": "Rizverse adalah platform entertainment terdepan yang menghadirkan ribuan judul anime, donghua, manga, dan film berkualitas tinggi. Download aplikasi mobile dan desktop kami untuk pengalaman streaming terbaik.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://rizverse.my.id/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Rizverse",
                "url": "https://rizverse.my.id",
                "sameAs": [
                  "https://twitter.com/rizverse",
                  "https://instagram.com/rizverse",
                  "https://facebook.com/rizverse",
                  "https://tiktok.com/@rizverse"
                ]
              }
            })
          }}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          storageKey="theme">
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}