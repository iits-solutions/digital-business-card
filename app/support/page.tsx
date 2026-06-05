import Link from "next/link";
import Image from "next/image";

export default function SupportPage() {
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

        {/* Logo */}
        <div className="text-center mb-10">
          <Image
            src="/iLinq-Logo.png"
            alt="iLinq.Team"
            width={220}
            height={220}
            className="mx-auto"
            priority
          />
<h1 className="text-5xl font-bold mt-6 mb-4">
  Support Center
</h1>

<p className="text-xl text-gray-400">
  Need help with iLinq.Team? We're here to assist you.
</p>
</div>
{/* FAQ Section */}
<div className="bg-blue-950 border border-blue-800 rounded-xl p-8 mb-10">

  <h2 className="text-3xl font-bold text-center mb-8">
    Frequently Asked Questions
  </h2>

  <div className="space-y-10">

    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-2">
        How do I reset my password?
      </h3>
      <p className="text-gray-300">
        Use the Forgot Password option on the login page.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-2">
        How do I update my profile?
      </h3>
      <p className="text-gray-300">
        Login to your account and update your profile information.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-2">
        How do I use my NFC card?
      </h3>
      <p className="text-gray-300">
        Tap your NFC card on a compatible smartphone or scan the QR code.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-blue-300 mb-2">
        Is iLinq.Team currently in Beta?
      </h3>
      <p className="text-gray-300">
        Yes. We are currently operating in Public Beta while continuously improving the platform.
      </p>
    </div>

  </div>

  </div>
{/* Support Contact Card */}
<div className="bg-blue-950 border border-blue-800 rounded-xl p-8 text-center">

  <h2 className="text-3xl font-bold mb-4">
    Still Need Help?
  </h2>

  <p className="text-gray-300 mb-4">
    Contact our support team directly.
  </p>

  <a
  href="mailto:support@ilinq.team"
  className="text-xl font-semibold text-blue-300 hover:text-white transition"
>
  support@ilinq.team
</a>

  <p className="text-gray-400 mb-6">
    Typical response time: 24–48 hours
  </p>

  <Link
    href="/contact"
    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
  >
    Contact Us
  </Link>

</div>
</div>

</main>
);
}