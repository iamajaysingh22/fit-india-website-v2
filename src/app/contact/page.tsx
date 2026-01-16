import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Support & Contact - FitByConnect',
  description: 'Get help and contact FitByConnect support team',
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Section id="contact" background="white" padding="xl" className="pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-h1 text-neutral-900 mb-6">
                Support & Contact
              </h1>
              <p className="text-large text-neutral-600">
                We&apos;re here to help you on your fitness journey
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-neutral-700">
              {/* Get Help */}
              <section className="mb-12">
                <h2 className="text-h3 text-neutral-900 mb-6">Get Help</h2>

                {/* Email Support */}
                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h3 className="text-h4 text-neutral-800 mb-4">Email Support</h3>
                  <ul className="list-none space-y-3">
                    <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-neutral-600">General Inquiries:</span>
                      <a href="mailto:support@fitbyconnect.in" className="text-primary-600 hover:text-primary-700 hover:underline">
                        support@fitbyconnect.in
                      </a>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-neutral-600">Privacy Questions:</span>
                      <a href="mailto:privacy@fitbyconnect.in" className="text-primary-600 hover:text-primary-700 hover:underline">
                        privacy@fitbyconnect.in
                      </a>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-neutral-600">Business/Partnership:</span>
                      <a href="mailto:business@fitbyconnect.in" className="text-primary-600 hover:text-primary-700 hover:underline">
                        business@fitbyconnect.in
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Response Time */}
                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <h3 className="text-h4 text-neutral-800 mb-2">Response Time</h3>
                  <p className="mb-0">
                    We typically respond within <strong>24-48 hours</strong> during business days.
                  </p>
                </div>

                {/* Website */}
                <div className="mb-6">
                  <h3 className="text-h4 text-neutral-800 mb-2">Website</h3>
                  <p>
                    Visit{' '}
                    <a
                      href="https://www.fitbyconnect.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      www.fitbyconnect.in
                    </a>{' '}
                    for more information
                  </p>
                </div>

                {/* Mailing Address */}
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-h4 text-neutral-800 mb-2">Mailing Address</h3>
                  <address className="not-italic text-neutral-700">
                    Greater Noida<br />
                    Uttar Pradesh<br />
                    India
                  </address>
                </div>
              </section>

              {/* FAQ */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-6">Frequently Asked Questions</h2>

                <div className="space-y-6">
                  <div className="border-b border-neutral-200 pb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      How do I book a trial?
                    </h3>
                    <p className="mb-0">
                      Browse gyms, select a trial session, and confirm your booking. It&apos;s that simple!
                    </p>
                  </div>

                  <div className="border-b border-neutral-200 pb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      How do I cancel a booking?
                    </h3>
                    <p className="mb-0">
                      Go to &quot;My Bookings&quot; and select cancel (subject to gym policy).
                    </p>
                  </div>

                  <div className="border-b border-neutral-200 pb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      How do I delete my account?
                    </h3>
                    <p className="mb-0">
                      Contact{' '}
                      <a href="mailto:support@fitbyconnect.in" className="text-primary-600 hover:text-primary-700 hover:underline">
                        support@fitbyconnect.in
                      </a>{' '}
                      to request account deletion.
                    </p>
                  </div>

                  <div className="pb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Is my data secure?
                    </h3>
                    <p className="mb-0">
                      Yes, we use industry-standard encryption and security measures. Read our{' '}
                      <a href="/privacy-policy" className="text-primary-600 hover:text-primary-700 hover:underline">
                        Privacy Policy
                      </a>{' '}
                      for more details.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="border-t border-neutral-200 pt-8 mt-12 text-center text-neutral-500">
                <p>&copy; 2025 FitByConnect. All rights reserved.</p>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
