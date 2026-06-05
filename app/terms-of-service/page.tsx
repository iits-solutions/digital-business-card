import Link from "next/link";
import Image from "next/image";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-blue-700 rounded-lg bg-blue-950 hover:bg-blue-900 transition text-blue-300 hover:text-white"
        >
          <span>🏠</span>
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <Image
            src="/iLinq-Logo.png"
            alt="iLinq.Team"
            width={220}
            height={220}
            className="mx-auto"
            priority
          />

          <h1 className="text-5xl font-bold mt-6 mb-4">
            Terms of Service
          </h1>

          <p className="text-gray-400">
            Last Updated: June 2026
          </p>
        </div>

        {/* Terms Card */}
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By accessing or using iLinq.Team, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              User Accounts
            </h2>
            <p className="text-gray-300">
              Users are responsible for maintaining the security of their accounts and passwords.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Acceptable Use
            </h2>
            <p className="text-gray-300">
              Users must not misuse the platform, attempt unauthorized access, or engage in unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Intellectual Property
            </h2>
            <p className="text-gray-300">
              All content, branding, logos, and software associated with iLinq.Team remain the property of Imran IT Solutions (IITS).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Service Availability
            </h2>
            <p className="text-gray-300">
              We strive to provide uninterrupted service but do not guarantee continuous availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Changes to Terms
            </h2>
            <p className="text-gray-300">
              We may update these Terms of Service periodically. Continued use of the platform constitutes acceptance of any updates.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}