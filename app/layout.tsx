import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/Header"

import dynamic from 'next/dynamic'

const Background3D = dynamic(() => import('@/components/Background3D').then(mod => mod.Background3D), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Career Path Finder - Discover Your Future",
  description: "Explore career paths, salary ranges, and roadmap to success",
  icons: {
    icon: '/education.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Background3D />
          <Header />
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
