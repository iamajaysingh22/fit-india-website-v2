import { Header, Footer } from '@/components/layout';
import { GymOwners } from '@/components/sections';

export default function GymPartner() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <GymOwners />
      </main>
      <Footer />
    </div>
  );
}