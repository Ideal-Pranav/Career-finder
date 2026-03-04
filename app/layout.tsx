import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import dynamic from "next/dynamic"
import Link from "next/link"

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
    icon: "/education.png",
    shortcut: "/education.png",
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
        url: "/education.png",
        width: 1200,
        height: 630,
        alt: "Career Path Finder - Discover Your Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Path Finder - Discover Your Future",
    description: "Explore career paths, salary ranges, and roadmap to success.",
    images: ["/education.png"],
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
          <footer className="relative z-10 border-t border-white/10 bg-background/80 backdrop-blur-lg mt-10">
            <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} Career Finder. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Link
                  href="/guides/after-10th"
                  className="hover:text-primary transition-colors"
                >
                  Guide: Career Options After 10th
                </Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
