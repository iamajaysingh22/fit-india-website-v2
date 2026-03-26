import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Delete Account — fitbyconnect',
  description: 'Learn how to request deletion of your fitbyconnect account and personal profile data.',
};

const deletedItems = [
  'Full name',
  'Email address',
  'Date of birth',
  'Gender',
  'Height and weight',
  'Fitness goals',
  'Profile photo / avatar',
  'Location preferences (last known city, coordinates)',
  'Account credentials (phone number used to sign in)',
];

const steps = [
  <>Send an email to <strong>support@fitbyconnect.in</strong> from the email address registered on your account</>,
  <>Use subject line: <strong>&quot;Account Deletion Request&quot;</strong></>,
  <>Include your registered phone number in the email body so we can identify your account</>,
  <>You will receive a confirmation email within <strong>3 business days</strong></>,
  <>Your account and profile data will be permanently deleted within <strong>30 days</strong> of confirmation</>,
];

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main>
        <Section id="delete-account" background="white" padding="xl" className="pt-32">
          <div className="max-w-[720px] mx-auto px-6">

            {/* Hero */}
            <div className="text-center mb-10">
              <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase mb-3" style={{ letterSpacing: '0.3px' }}>
                fitbyconnect
              </p>
              <h1 className="text-h1 text-neutral-900 mb-4">Delete Your Account</h1>
              <p className="text-large text-neutral-500 leading-relaxed">
                We&apos;re sorry to see you go. Here&apos;s everything you need to know before submitting your request.
              </p>
            </div>

            {/* What Gets Deleted */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 mb-6">
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: '#D94F4F' }}
              >
                What gets deleted
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                The following data is permanently removed when your deletion request is processed.
              </p>
              <ul className="space-y-3">
                {deletedItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 5.5L4.5 8L9 3" stroke="#D94F4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What Is NOT Deleted */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 mb-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                What we are required to keep
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Some data is not under your control to delete because it belongs to the gym, not fitbyconnect.
              </p>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                <p className="text-neutral-700">
                  Membership records, payment history, attendance logs, and any information you provided directly to a gym
                  (such as your name and phone number given at the time of enrollment) are managed by the gym owner —
                  not fitbyconnect. We are not able to delete this data on your behalf.{' '}
                  <strong>Please contact your gym directly</strong> for requests related to gym records.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                <p className="text-neutral-600">
                  For legal and financial compliance, anonymized transaction records may be retained for up to{' '}
                  <strong>7 years</strong> as required under applicable Indian law.
                </p>
              </div>
            </div>

            {/* How to Submit */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 mb-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-1">
                How to submit your request
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Follow these steps to initiate an account deletion.
              </p>

              <ol className="space-y-4 mb-8">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ background: '#E8907A' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-neutral-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="mailto:support@fitbyconnect.in?subject=Account%20Deletion%20Request"
                  className="inline-flex items-center justify-center text-white font-semibold px-8 rounded-full transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: '#E8907A',
                    height: '52px',
                    fontSize: '16px',
                  }}
                >
                  Send Deletion Request
                </a>

                <p
                  className="mt-5 text-neutral-400 mx-auto max-w-md"
                  style={{ fontSize: '13px', lineHeight: '1.6', letterSpacing: '0.3px' }}
                >
                  Deletion requests are processed manually. Once confirmed, this action is permanent and cannot be undone.
                  If you have an active gym membership, deleting your fitbyconnect account will not cancel your membership
                  with the gym.
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
