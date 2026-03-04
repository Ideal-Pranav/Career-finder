import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import dynamic from "next/dynamic"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/Header"

const Background3D = dynamic(
  () => import("@/components/Background3D").then((mod) => mod.Background3D),
  {
    ssr: false,
  }
)

const inter = Inter({ subsets: ["latin"] })

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://career-finders.vercel.app"
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Career Path Finder - Discover Your Future",
  description: "Explore career paths, salary ranges, and roadmap to success.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/education.png",
  },
  openGraph: {
    title: "Career Path Finder - Discover Your Future",
    description: "Explore career paths, salary ranges, and roadmap to success.",
    url: "/",
    siteName: "Career Path Finder",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Career Finder logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Path Finder - Discover Your Future",
    description: "Explore career paths, salary ranges, and roadmap to success.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Career Path Finder",
    url: siteUrl,
    description:
      "Explore career paths, salary ranges, and roadmap to success with Career Path Finder.",
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>

        <ThemeProvider>
          <Background3D />
          <Header />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
