import Link from "next/link";
import Image from "next/image";
export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

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
            Pricing Plans
          </h1>

          <p className="text-gray-400">
            Choose the plan that best fits your networking needs.
          </p>
        </div>

{/* Plans */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

  {/* Free */}
  <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
    <h2 className="text-3xl font-bold mb-2">Free</h2>
    <p className="text-4xl font-bold mb-6">$0</p>

    <ul className="space-y-3 text-gray-300">
      <li>✔ Digital Profile</li>
      <li>✔ QR Code Sharing</li>
      <li>✔ Social Links</li>
      <li>✔ Basic Customization</li>
      <li>✔ Community Support</li>
    </ul>
  </div>

  {/* Professional */}
  <div className="bg-blue-950 border-2 border-blue-500 rounded-xl p-6">
    <div className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-4">
      Most Popular
    </div>

    <h2 className="text-3xl font-bold mb-2 text-blue-300">
      Professional
    </h2>

    <p className="text-4xl font-bold mb-6">
      $4.99
      <span className="text-lg text-gray-400"> / month</span>
    </p>

    <ul className="space-y-3 text-gray-300">
      <li>✔ Everything in Free</li>
      <li>✔ NFC Card Support</li>
      <li>✔ Analytics</li>
      <li>✔ Custom Branding</li>
      <li>✔ Priority Support</li>
    </ul>
  </div>

  {/* Business */}
  <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
    <h2 className="text-3xl font-bold mb-2">
      Business
    </h2>

    <p className="text-4xl font-bold mb-6">
      $14.99
      <span className="text-lg text-gray-400"> / month</span>
    </p>

    <ul className="space-y-3 text-gray-300">
      <li>✔ Everything in Professional</li>
      <li>✔ Team Management</li>
      <li>✔ Multiple Profiles</li>
      <li>✔ Advanced Analytics</li>
      <li>✔ Premium Support</li>
    </ul>
  </div>

  {/* Enterprise */}
  <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
    <h2 className="text-3xl font-bold mb-2">
      Enterprise
    </h2>

    <p className="text-gray-400 mb-4">
      Custom business solutions.
    </p>

    <p className="text-4xl font-bold mb-6">
      Custom Quote
    </p>

    <ul className="space-y-3 text-gray-300">
      <li>✔ Team Dashboard</li>
      <li>✔ Employee Profiles</li>
      <li>✔ Custom NFC Cards</li>
      <li>✔ Dedicated Support</li>
      <li>✔ Custom Solutions</li>
    </ul>

    <div className="mt-6">
      <Link
        href="/contact"
        className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Contact Sales
      </Link>
    </div>
  </div>

</div>
        {/* NFC Pricing */}
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6 text-center">
            NFC Card Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Basic NFC Card
              </h3>
              <p className="text-2xl font-bold">
                Starting at $9.99
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Premium NFC Card
              </h3>
              <p className="text-2xl font-bold">
                Starting at $19.99
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Custom Business Cards
              </h3>
              <p className="text-2xl font-bold">
                Contact Us
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}