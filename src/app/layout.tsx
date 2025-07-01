import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitIndia - Transform Your Fitness Journey | Download Free App",
  description: "Discover gyms, manage memberships, and track your fitness progress with our all-in-one fitness app. Join thousands of users and gym owners transforming their fitness journey.",
  keywords: "fitness app, gym finder, workout tracker, membership management, fitness community, India fitness, gym management software",
  authors: [{ name: "FitIndia Team" }],
  creator: "FitIndia",
  publisher: "FitIndia",
  openGraph: {
    title: "FitIndia - Your Complete Fitness Solution",
    description: "Find gyms, track workouts, and achieve your fitness goals with our comprehensive fitness ecosystem",
    url: "https://fitindia.com",
    siteName: "FitIndia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitIndia - Transform Your Fitness Journey",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitIndia - Transform Your Fitness Journey",
    description: "The complete fitness ecosystem for users and gym owners in India",
    images: ["/twitter-image.jpg"],
    creator: "@fitindia",
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
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
