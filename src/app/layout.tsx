import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Free Gym Trials Near Me | Try Before You Commit | FitByConnect",
  description: "Book FREE trial sessions at top gyms near you. Try before you commit. Find your perfect fitness match. No payment. No obligation. Download now!",
  keywords: "free gym trials near me, gym trial sessions, try gym before joining, find gyms near me, best gyms, gym membership booking, fitness center trials, free gym trials, gym finder, workout trial",
  authors: [{ name: "FitByConnect Team" }],
  creator: "FitByConnect",
  publisher: "FitByConnect",
  openGraph: {
    title: "Free Gym Trials Near Me | Try Before You Commit",
    description: "Book FREE trial sessions at top gyms near you. Experience facilities, meet trainers, and join only when you're sure.",
    url: "https://www.fitbyconnect.in",
    siteName: "FitByConnect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free gym trials - Find your perfect gym match",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Gym Trials Near Me | Try Before You Commit",
    description: "Book FREE trial sessions at top gyms near you. No payment. No obligation.",
    images: ["/twitter-image.jpg"],
    creator: "@fitbyconnect",
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
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.fitbyconnect.in/#organization",
        "name": "FitByConnect",
        "url": "https://www.fitbyconnect.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.fitbyconnect.in/logo.png"
        },
        "description": "Book FREE trial sessions at top gyms near you. Try before you commit.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://twitter.com/fitbyconnect",
          "https://facebook.com/fitbyconnect",
          "https://instagram.com/fitbyconnect"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.fitbyconnect.in/#website",
        "url": "https://www.fitbyconnect.in",
        "name": "FitByConnect",
        "description": "Free Gym Trials Near Me - Try Before You Commit",
        "publisher": {
          "@id": "https://www.fitbyconnect.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.fitbyconnect.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Service",
        "name": "Free Gym Trial Booking",
        "description": "Book free trial sessions at gyms near you before committing to membership",
        "provider": {
          "@id": "https://www.fitbyconnect.in/#organization"
        },
        "areaServed": "IN",
        "serviceType": "Fitness Center Booking"
      }
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
