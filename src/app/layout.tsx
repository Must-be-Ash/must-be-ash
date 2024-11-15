import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Inter as FontSans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'must-be-ash - Turn Ideas into MVPs Without Coding',
  description: 'Learn how to build MVPs and functional products without coding. Using tools like Cursor, Replit, V0, and Claude for rapid prototyping and development.',
  keywords: 'Cursor, Replit, V0, Claude, code-gen, no code, zero code, zerocode, zero-code, MVP, MVP building, Prototyping, rapid development, no-code to code, product development, startup tools, AI development, product design',
  authors: [{ name: 'Ash Nouruzi' }],
  creator: 'must-be-ash',
  publisher: 'must-be-ash',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://must-be-ash.com/'), // Replace with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://must-be-ash.com/',
    title: 'must-be-ash - Turn Ideas into MVPs Without Coding',
    description: 'Learn how to build MVPs and functional products without coding. Using tools like Cursor, Replit, V0, and Claude for rapid prototyping and development.',
    siteName: 'must-be-ash',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'must-be-ash - Turn Ideas into MVPs Without Coding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'must-be-ash - Turn Ideas into MVPs Without Coding',
    description: 'Learn how to build MVPs and functional products without coding. Using tools like Cursor, Replit, V0, and Claude for rapid prototyping and development.',
    images: ['/twitter-image.png'],
    creator: '@must_be_ash',
    site: '@must_be_ash',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
    other: {
      me: ['your-personal-site'],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-[#f8f8f8] font-sans antialiased",
        fontSans.variable
      )}>
        <main className="container mx-auto">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
