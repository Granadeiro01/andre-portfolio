import type { Metadata } from "next";
import { getAbsoluteUrl } from "@/lib/utils";
import { ChatAgent } from "@/components/ChatAgent";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Andre Granadeiro | ML Engineer, Founder, Athlete",
  description:
    "Full-stack ML engineer and founder building AI-driven solutions. Unique blend of elite athletic experience and technical expertise.",
  keywords: [
    "Machine Learning",
    "AI Engineer",
    "Founder",
    "Full-stack Developer",
    "Data Science",
    "Python",
    "Next.js",
    "Real Estate",
    "Performance Analytics",
  ],
  authors: [{ name: "Andre Granadeiro" }],
  creator: "Andre Granadeiro",
  publisher: "Andre Granadeiro",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getAbsoluteUrl("/"),
    siteName: "Andre Granadeiro",
    title: "Andre Granadeiro | ML Engineer, Founder, Athlete",
    description:
      "Full-stack ML engineer and founder building AI-driven solutions.",
    images: [
      {
        url: getAbsoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Andre Granadeiro",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andre Granadeiro | ML Engineer, Founder, Athlete",
    description:
      "Full-stack ML engineer building AI-driven solutions for performance optimization.",
    images: [getAbsoluteUrl("/og-image.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="msapplication-TileColor" content="#0a0e27" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-900 text-gray-100">
        {/* Main content */}
        <main className="relative min-h-screen overflow-x-hidden">
          {children}
        </main>

        {/* Background elements (optional animated elements) */}
        <div className="fixed inset-0 -z-10 bg-gradient-dark pointer-events-none" />

        {/* Chat Agent */}
        <ChatAgent />

        {/* Scroll indicator (optional) */}
        <div className="fixed bottom-10 right-10 z-40 hidden md:block" id="scroll-indicator" />
      </body>
    </html>
  );
}
