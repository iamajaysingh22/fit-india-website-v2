import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms of Service - FitByConnect',
  description: 'Terms of Service for FitByConnect fitness platform',
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Section id="terms-and-conditions" background="white" padding="xl" className="pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-h1 text-neutral-900 mb-6">
                Terms of Service for FitByConnect
              </h1>
              <p className="text-large text-neutral-600">
                Last Updated: January 16, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-neutral-700">
              {/* Acceptance of Terms */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using FitByConnect, you accept and agree to be bound by these Terms of Service.
                </p>
              </section>

              {/* Service Description */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Service Description</h2>
                <p>
                  FitByConnect is a fitness trial booking platform connecting gym seekers with fitness centers
                  through free trial sessions and membership services.
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">User Accounts</h2>

                <h3 className="text-h4 text-neutral-800 mb-3">Registration</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>You must provide accurate information during registration</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per user</li>
                  <li>Minimum age requirement: 13 years</li>
                </ul>

                <h3 className="text-h4 text-neutral-800 mb-3">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep login credentials confidential</li>
                  <li>Notify us immediately of unauthorized access</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              {/* Bookings and Trials */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Bookings and Trials</h2>

                <h3 className="text-h4 text-neutral-800 mb-3">Trial Sessions</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Trial bookings are subject to gym availability</li>
                  <li>Users must honor confirmed bookings</li>
                  <li>No-shows may result in account restrictions</li>
                  <li>Trial terms are set by individual gyms</li>
                </ul>

                <h3 className="text-h4 text-neutral-800 mb-3">Memberships</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Membership purchases are transactions between you and the gym</li>
                  <li>FitByConnect facilitates the connection only</li>
                  <li>Refund policies are determined by individual gyms</li>
                </ul>
              </section>

              {/* User Conduct */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">User Conduct</h2>
                <p className="mb-4">Users agree NOT to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Provide false information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Use the service for illegal purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Abuse or harass gym staff or other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Attempt to bypass security measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Create multiple accounts to abuse trial offers</span>
                  </li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Intellectual Property</h2>
                <p>
                  All content, features, and functionality are owned by FitByConnect and protected by
                  copyright and trademark laws.
                </p>
              </section>

              {/* Disclaimers */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Disclaimers</h2>
                <div className="bg-neutral-50 rounded-lg p-6">
                  <ul className="list-disc pl-6 space-y-2 mb-0">
                    <li>Services provided &quot;as is&quot; without warranties</li>
                    <li>We do not guarantee gym quality or trial availability</li>
                    <li>Not responsible for injuries during gym sessions</li>
                    <li>Not liable for disputes between users and gyms</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Limitation of Liability</h2>
                <p>
                  FitByConnect shall not be liable for indirect, incidental, or consequential damages
                  arising from service use.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Termination</h2>
                <p className="mb-4">We reserve the right to suspend or terminate accounts for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Terms of Service violations</li>
                  <li>Fraudulent activity</li>
                  <li>Repeated no-shows</li>
                  <li>Abusive behavior</li>
                </ul>
              </section>

              {/* Modifications */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Modifications</h2>
                <p>
                  We may modify these terms at any time. Continued use constitutes acceptance of updated terms.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Governing Law</h2>
                <p>
                  These terms are governed by the laws of India.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Contact</h2>
                <p className="mb-2">For questions about these terms:</p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Email</strong>:{' '}
                    <a href="mailto:support@fitbyconnect.in" className="text-primary-600 hover:text-primary-700 hover:underline">
                      support@fitbyconnect.in
                    </a>
                  </li>
                  <li>
                    <strong>Website</strong>:{' '}
                    <a
                      href="https://www.fitbyconnect.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      www.fitbyconnect.in
                    </a>
                  </li>
                </ul>
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
