import { Header, Footer } from '@/components/layout';
import { Hero, Features, Solution, GymSeekerFeatures, UserFAQ, Testimonials, Contact } from '@/components/sections';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Gym Trials Near Me | Try Before You Commit | FitByConnect",
  description: "Book FREE trial sessions at top gyms near you. Try before you commit. Find your perfect fitness match. No payment. No obligation. Download now!",
  keywords: "free gym trials near me, gym trial sessions, try gym before joining, find gyms near me, best gyms, gym membership booking, fitness center trials",
  alternates: {
    canonical: "https://www.fitbyconnect.in",
  },
  openGraph: {
    title: "Free Gym Trials Near Me | Book Trial Sessions",
    description: "Book FREE trial sessions at gyms near you. Experience facilities, meet trainers, join only when sure.",
    type: "website",
    url: "https://www.fitbyconnect.in",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Solution />
        <GymSeekerFeatures />
        <UserFAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
