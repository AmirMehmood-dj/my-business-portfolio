import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/layout/ScrollProgress";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Script from "next/script";

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

const siteUrl = "https://aamirmehmood.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aamir Mehmood — Website & Application Developer",
    template: "%s | Aamir Mehmood",
  },
  description:
    "Aamir Mehmood — Freelance Website & Application Developer from Pakistan. I build fast, scalable web apps, mobile apps, and AI-powered solutions using React, Next.js, and React Native. Available for freelance projects.",
  keywords: [
    "Aamir Mehmood",
    "Website Developer Pakistan",
    "Application Developer Pakistan",
    "Freelance Developer Pakistan",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Mobile App Developer",
    "Full Stack Developer",
    "TypeScript Developer",
    "AI Prompt Engineer",
    "SEO Developer",
    "Figma to Code",
    "Hire Web Developer",
    "Web Development Services",
  ],
  authors: [{ name: "Aamir Mehmood", url: siteUrl }],
  creator: "Aamir Mehmood",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Aamir Mehmood Portfolio",
    title: "Aamir Mehmood — Website & Application Developer",
    description:
      "Freelance Website & Application Developer from Pakistan. Building fast, scalable web apps, mobile apps, and AI-powered solutions. Available for new projects.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aamir Mehmood — Website & Application Developer",
      },
    ],
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
  manifest: "/manifest.json",
  verification: {
    google: "lHTLTQCd_8etLKCiSp9csewYVz-062HrEjtfURQxu4A",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aamir Mehmood",
  url: siteUrl,
  jobTitle: "Website & Application Developer",
  description:
    "Expert in building scalable web apps, mobile apps, SEO-optimized websites, and converting Figma designs into pixel-perfect UI.",
  sameAs: [
    "https://github.com/AmirMehmood-dj",
    "https://www.linkedin.com/in/amirmehmood0325/",
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
  name: "Aamir Mehmood Portfolio",
  url: siteUrl,
  author: {
    "@type": "Person",
    name: "Aamir Mehmood",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FPQ0K6P2P6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FPQ0K6P2P6');
          `}
        </Script>
        <ScrollProgress />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
