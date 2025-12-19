import { Header, Footer } from '@/components/layout';
import { GymOwners, GymPartnerFAQ, Contact } from '@/components/sections';

export default function GymPartner() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <GymOwners />
        <GymPartnerFAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}