import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/layout/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://amirmehar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amir Mehar — Frontend Engineer & Mobile Developer",
    template: "%s | Amir Mehar",
  },
  description:
    "Expert frontend engineer specializing in React, Next.js, React Native, and AI integrations. Building fast, scalable, and modern web & mobile applications.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "React Native",
    "Mobile App Developer",
    "TypeScript",
    "Tailwind CSS",
    "AI Prompt Engineer",
    "Freelance Developer",
    "Amir Mehar",
  ],
  authors: [{ name: "Amir Mehar", url: siteUrl }],
  creator: "Amir Mehar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Amir Mehar Portfolio",
    title: "Amir Mehar — Frontend Engineer & Mobile Developer",
    description:
      "Expert frontend engineer specializing in React, Next.js, React Native, and AI integrations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amir Mehar — Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir Mehar — Frontend Engineer & Mobile Developer",
    description:
      "Expert frontend engineer specializing in React, Next.js, React Native, and AI integrations.",
    images: ["/og-image.jpg"],
    creator: "@amirmehar",
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
  alternates: {
    canonical: siteUrl,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amir Mehar",
  url: siteUrl,
  jobTitle: "Frontend Engineer & Mobile Developer",
  description:
    "Expert in building scalable web apps, mobile apps, SEO-optimized websites, and converting Figma designs into pixel-perfect UI.",
  sameAs: [
    "https://github.com/amirmehar",
    "https://linkedin.com/in/amirmehar",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Tailwind CSS",
    "Supabase",
    "AI Prompt Engineering",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amir Mehar Portfolio",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Amir Mehar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#0F172A]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
