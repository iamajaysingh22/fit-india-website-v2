import { Header, Footer } from '@/components/layout';
import { Hero, Features, Solution, GymSeekerFeatures, Testimonials, Contact } from '@/components/sections';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Solution />
        <GymSeekerFeatures />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
