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
                Privacy Policy for FitByConnect
              </h1>
              <p className="text-large text-neutral-600">
                Last Updated: January 16, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-neutral-700">
              {/* Introduction */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Introduction</h2>
                <p>
                  FitByConnect (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the FitByConnect mobile application.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you use our application.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Information We Collect</h2>

                <h3 className="text-h4 text-neutral-800 mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Name and contact details (phone number, email)</li>
                  <li>Profile information (age, gender, fitness goals)</li>
                  <li>Location data (to find nearby gyms)</li>
                  <li>Profile photos (optional)</li>
                  <li>Gym membership and booking history</li>
                </ul>

                <h3 className="text-h4 text-neutral-800 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device information (model, OS version)</li>
                  <li>Usage data and app interactions</li>
                  <li>IP address and general location</li>
                </ul>
              </section>

              {/* Permissions We Request */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Permissions We Request</h2>

                <h3 className="text-h4 text-neutral-800 mb-3">Camera and Media Access</h3>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">What We Access</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Camera</strong>: For taking profile photos and scanning QR codes</li>
                  <li><strong>Photo Library/Gallery</strong>: For selecting existing photos to upload</li>
                </ul>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">When We Access</h4>
                <p className="mb-2">We only access your camera or photos when:</p>
                <ol className="list-decimal pl-6 mb-6 space-y-2">
                  <li>You tap &quot;Upload Photo&quot; or &quot;Change Profile Picture&quot;</li>
                  <li>You tap &quot;Scan QR Code&quot; for gym check-in</li>
                  <li>You grant permission through the system prompt</li>
                </ol>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">What We Do With Camera Data</h4>

                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h5 className="font-semibold text-neutral-800 mb-2">Profile Photos</h5>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Storage</strong>: Uploaded to Supabase Storage with encryption</li>
                    <li><strong>Access</strong>: Only you and gyms you&apos;ve booked with can view</li>
                    <li><strong>Retention</strong>: Until you delete the photo or account</li>
                    <li><strong>Security</strong>: Protected by Row Level Security policies</li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h5 className="font-semibold text-neutral-800 mb-2">QR Code Scanning</h5>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Processing</strong>: QR codes are processed locally on your device</li>
                    <li><strong>Storage</strong>: Only booking/check-in data is stored, not the QR image</li>
                    <li><strong>Purpose</strong>: Verify gym entry and attendance</li>
                  </ul>
                </div>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">What We DON&apos;T Do</h4>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Access camera without permission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Access photos in background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Share photos with third parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Use photos for advertising or analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Store QR code images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <span>Access camera roll without explicit action</span>
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">Your Control</h4>
                <p className="mb-2">You can:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Deny camera permission (app will still work for bookings)</li>
                  <li>Revoke permission anytime in device settings</li>
                  <li>Delete uploaded photos from your profile</li>
                  <li>Use the app without uploading photos</li>
                </ul>

                <h4 className="text-lg font-semibold text-neutral-800 mb-2">Revoking Camera Access</h4>
                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <p className="mb-2"><strong>Android</strong>: Settings → Apps → FitByConnect → Permissions → Camera → Deny</p>
                  <p><strong>iOS</strong>: Settings → FitByConnect → Camera → Never</p>
                </div>

                <p className="mb-2">If you deny camera access, you can still:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Browse and book gym trials</li>
                  <li>Manage memberships</li>
                  <li>View booking history</li>
                  <li>Contact support</li>
                </ul>

                <p className="mb-2">You will NOT be able to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Upload profile photos via camera</li>
                  <li>Scan QR codes (can use manual entry code instead)</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">How We Use Your Information</h2>
                <p className="mb-2">We use collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Facilitate gym trial bookings and membership management</li>
                  <li>Connect you with fitness centers</li>
                  <li>Send booking confirmations and updates via SMS/WhatsApp</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide customer support</li>
                  <li>Send promotional offers (with your consent)</li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Information Sharing</h2>
                <p className="mb-4">We share your information with:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Gym Partners</strong>: To process your trial bookings and memberships</li>
                  <li><strong>Service Providers</strong>: SMS/WhatsApp services, cloud storage (Supabase)</li>
                  <li><strong>Legal Requirements</strong>: When required by law</li>
                </ul>
                <p className="font-semibold">We do NOT sell your personal information to third parties.</p>
              </section>

              {/* Data Security */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Data Security</h2>
                <p className="mb-2">We implement industry-standard security measures including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encrypted data transmission (SSL/TLS)</li>
                  <li>Secure authentication (OTP verification)</li>
                  <li>Row Level Security policies on database</li>
                  <li>Regular security audits</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Your Rights</h2>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request data correction or deletion</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Data Retention</h2>
                <p>
                  We retain your data for as long as your account is active or as needed to provide services.
                  You may request deletion by contacting us.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Children&apos;s Privacy</h2>
                <p>
                  Our service is not intended for users under 13 years of age.
                  We do not knowingly collect information from children.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Changes to Privacy Policy</h2>
                <p>
                  We may update this policy periodically. Users will be notified of significant changes
                  via email or app notification.
                </p>
              </section>

              {/* Contact Us */}
              <section className="mb-10">
                <h2 className="text-h3 text-neutral-900 mb-4">Contact Us</h2>
                <p className="mb-2">For privacy-related questions:</p>
                <ul className="list-none space-y-2">
                  <li><strong>Email</strong>: privacy@fitbyconnect.in</li>
                  <li><strong>Website</strong>: www.fitbyconnect.in</li>
                  <li><strong>Address</strong>: Greater Noida</li>
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
