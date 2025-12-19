import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy - FitByConnect',
  description: 'Privacy Policy for FitByConnect fitness platform',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Section id="privacy-policy" background="white" padding="xl" className="pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-h1 text-neutral-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-large text-neutral-600">
                Last updated: [Date]
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-neutral-50 rounded-lg p-8 text-center">
                <p className="text-neutral-600 mb-0">
                  Content will be updated soon. Please check back later.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}