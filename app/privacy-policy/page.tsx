import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-blue-700 rounded-lg bg-blue-950 hover:bg-blue-900 transition text-blue-300 hover:text-white"
        >
          <span>🏠</span>
          <span>Back to Home</span>
        </Link>

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
            Privacy Policy
          </h1>

          <p className="text-gray-400">
            Last Updated: June 2026
          </p>
        </div>

        <div className="bg-blue-950 border border-blue-800 rounded-xl p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Information We Collect
            </h2>
            <p className="text-gray-300">
              We collect information that you voluntarily provide when creating an account or using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              How We Use Information
            </h2>
            <p className="text-gray-300">
              We use your information to provide, maintain, and improve the iLinq.Team platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Account Security
            </h2>
            <p className="text-gray-300">
              We take reasonable measures to protect user data and account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Third-Party Services
            </h2>
            <p className="text-gray-300">
              We may use trusted third-party services such as Supabase and Resend to provide platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Cookies & Analytics
            </h2>
            <p className="text-gray-300">
              We may use cookies and analytics tools to improve user experience and platform performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-300 mb-3">
              Contact Information
            </h2>
            <p className="text-gray-300">
              Questions regarding privacy may be directed to support@ilinq.team.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}