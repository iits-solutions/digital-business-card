import BetaNotice from "./components/BetaNotice";

import Link from "next/link";

import Navbar from "./components/Navbar";

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white">

    <BetaNotice />

      <Navbar />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32">

        <h1 className="text-6xl md:text-7xl font-bold max-w-4xl leading-tight">

          Smart Digital Business Cards

          <span className="text-gray-400">

            {" "}Powered by NFC

          </span>

        </h1>

        <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl">

          Create professional digital profiles, share instantly with QR & NFC,
          and grow your business identity with ILinq.

        </p>

        <div className="flex gap-6 mt-10">

          {/* FIXED BUTTON */}
          <Link
            href="/signup"
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >

            Get Started

          </Link>

          <a
            href="#features"
            className="border border-gray-700 px-6 py-3 rounded-xl hover:border-gray-500 transition"
          >

            Learn More

          </a>

        </div>

      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="px-6 py-32 max-w-7xl mx-auto"
      >

        <div className="text-center mb-20">

          <h2 className="text-5xl font-bold mb-6">

            Everything You Need

          </h2>

          <p className="text-gray-400 text-xl">

            Powerful tools to build your professional digital identity.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950">

            <h3 className="text-2xl font-semibold mb-4">

              QR Sharing

            </h3>

            <p className="text-gray-400">

              Instantly share your profile using dynamic QR codes.

            </p>

          </div>

          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950">

            <h3 className="text-2xl font-semibold mb-4">

              NFC Technology

            </h3>

            <p className="text-gray-400">

              Share profiles with a simple NFC tap experience.

            </p>

          </div>

          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950">

            <h3 className="text-2xl font-semibold mb-4">

              Company Profiles

            </h3>

            <p className="text-gray-400">

              Manage employee digital business cards professionally.

            </p>

          </div>

          <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950">

            <h3 className="text-2xl font-semibold mb-4">

              Multi-language

            </h3>

            <p className="text-gray-400">

              Support for English, Arabic, Urdu and more.

            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-32 bg-gray-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-bold mb-6">

              How ILinq Works

            </h2>

            <p className="text-gray-400 text-xl">

              Build and share your digital identity in seconds.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="text-center">

              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">

                1

              </div>

              <h3 className="text-2xl font-semibold mb-4">

                Create Profile

              </h3>

              <p className="text-gray-400">

                Build your professional digital business card with all your details.

              </p>

            </div>

            <div className="text-center">

              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">

                2

              </div>

              <h3 className="text-2xl font-semibold mb-4">

                Share Instantly

              </h3>

              <p className="text-gray-400">

                Share your profile using QR codes or NFC technology.

              </p>

            </div>

            <div className="text-center">

              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold mx-auto mb-6">

                3

              </div>

              <h3 className="text-2xl font-semibold mb-4">

                Grow Network

              </h3>

              <p className="text-gray-400">

                Connect with clients, professionals and businesses effortlessly.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Pricing */}
<section
  id="pricing"
  className="py-24 px-4 bg-black"
>

  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-12">

      <h2 className="text-5xl font-bold text-center mb-6">
  Pricing Plans
</h2>

<p className="text-center text-gray-400 mb-16">
  Choose the plan that best fits your networking needs.
</p>

    </div>

    {/* Cards */}
    <div className="flex justify-center gap-3 overflow-x-auto pb-2">

      {/* Free */}
      <div className="min-w-[170px] bg-[#081028] border border-white/10 rounded-2xl p-4 flex-shrink-0">

        <h3 className="text-lg font-bold mb-2">

          Free

        </h3>

        <p className="text-gray-400 text-sm mb-4">

          Getting started.

        </p>

        <h4 className="text-3xl font-bold mb-4">

          $0

        </h4>

        <ul className="space-y-1 text-sm text-gray-300 mb-5">

          <li>✓ Digital Profile</li>
          <li>✓ QR Code Sharing</li>
          <li>✓ Social Links</li>
          <li>✓ Basic Customization</li>
          <li>✓ Community Support</li>

        </ul>

        
        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-2 rounded-xl text-sm">

          Get Started

        </button>

      </div>

      {/* Professional */}
      <div className="min-w-[170px] bg-white text-black rounded-2xl p-4 flex-shrink-0 shadow-xl">

        <div className="inline-block bg-black text-white text-[10px] px-3 py-1 rounded-full mb-3">

          Popular

        </div>

        <h3 className="text-lg font-bold mb-2">

          Professional

        </h3>

        <p className="text-gray-600 text-sm mb-4">

          Professionals.

        </p>

        <h4 className="text-3xl font-bold mb-4">

          $4.99
          <span className="text-xs text-gray-500">

            /mo

          </span>

        </h4>

        <ul className="space-y-1 text-sm mb-5">

          <li>✓ Everything in Free</li>
          <li>✓ NFC Card Support</li>
          <li>✓ Analytics</li>
          <li>✓ Custom Branding</li>
          <li>✓ Priority Support</li>

        </ul>

        <button className="w-full bg-black text-white hover:bg-gray-800 transition py-2 rounded-xl text-sm">

          Upgrade

        </button>

      </div>

      {/* Business */}
      <div className="min-w-[170px] bg-[#081028] border border-white/10 rounded-2xl p-4 flex-shrink-0">

        <h3 className="text-lg font-bold mb-2">

          Business

        </h3>

        <p className="text-gray-400 text-sm mb-4">

          Agencies.

        </p>

        <h4 className="text-3xl font-bold mb-4">

          $14.99
          <span className="text-xs text-gray-400">

            /mo

          </span>

        </h4>

        <ul className="space-y-1 text-sm text-gray-300 mb-5">

          <li>✓ Everything in Professional</li> 
          <li>✓ Team Management</li>
          <li>✓ Multiple Profiles</li>
          <li>✓ Advanced Analytics</li>
          <li>✓ Premium Support</li>

        </ul>

        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-2 rounded-xl text-sm">

          Upgrade

        </button>

      </div>

      {/* Enterprise */}
<div className="min-w-[170px] bg-[#081028] border border-white/10 rounded-2xl p-4 flex-shrink-0">

  <h3 className="text-lg font-bold mb-2">
    Enterprise
  </h3>

  <p className="text-gray-400 text-sm mb-4">
    Custom business solutions.
  </p>

  <h4 className="text-2xl font-bold mb-4">
    Custom Quote
  </h4>

  <ul className="space-y-1 text-sm text-gray-300 mb-5">

    <li>✓ Team Dashboard</li>
    <li>✓ Employee Profiles</li>
    <li>✓ Custom NFC Cards</li>
    <li>✓ Dedicated Support</li>
    <li>✓ Volume Discounts</li>
    <li>✓ Custom Integrations</li>

  </ul>

  <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-2 rounded-xl text-sm">
    Contact Sales
  </button>

</div>

    </div>

  </div>

</section>

{/* NFC Pricing */}
<section className="py-16 px-4 bg-black">
  <div className="max-w-6xl mx-auto">

    <div className="bg-blue-950 border border-blue-800 rounded-xl p-8">

      <h3 className="text-3xl font-bold text-center mb-8">
        NFC Card Pricing
      </h3>

      <div className="grid md:grid-cols-3 gap-6 text-center">

        <div>
          <h4 className="font-semibold mb-2">
            Basic NFC Card
          </h4>

          <p className="text-2xl font-bold">
            Starting at $9.99
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Premium NFC Card
          </h4>

          <p className="text-2xl font-bold">
            Starting at $19.99
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Custom Business Cards
          </h4>

          <p className="text-2xl font-bold">
            Contact Us
          </p>
        </div>

      </div>

    </div>

  </div>
</section>

     {/* FOOTER */}
<footer className="border-t border-gray-800 bg-black px-6 py-16">

  <div className="max-w-7xl mx-auto">

    {/* Footer Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center text-center">

      {/* Brand */}
      <div>

        <h3 className="text-2xl font-bold mb-4">

          ilinq.team

        </h3>

        <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">

          Smart digital business cards powered by NFC and QR technology.

        </p>

      </div>

      {/* Product */}
      <div>

        <h4 className="text-lg font-semibold mb-4">

          Product

        </h4>

        <ul className="space-y-2 text-gray-400 text-sm">

          <li>
            <a
              href="#features"
              className="hover:text-white transition"
            >
              Features
            </a>
          </li>
<li>
  <Link
    href="/pricing"
    className="hover:text-white transition"
  >
    Pricing
  </Link>
</li>

          <li>
            <a
              href="#"
              className="hover:text-white transition"
            >
              Themes
            </a>
          </li>

        </ul>

      </div>

      {/* Company */}
      <div>

        <h4 className="text-lg font-semibold mb-4">

          Company

        </h4>

        <ul className="space-y-2 text-gray-400 text-sm">

          <li>
            <a
  href="/about"
  className="hover:text-white transition"
>
  About
</a>
          </li>

          <li>
            <a
              href="/contact"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </li>

          <li>
  <Link
    href="/support"
    className="hover:text-white transition"
  >
    Support
  </Link>
</li>

        </ul>

      </div>

      {/* Legal */}
      <div>

        <h4 className="text-lg font-semibold mb-4">

          Legal

        </h4>

        <ul className="space-y-2 text-gray-400 text-sm">

          <li>
            <Link
  href="/privacy-policy"
  className="hover:text-white transition"
>
  Privacy Policy
</Link>
          </li>

          <li>
  <Link
    href="/terms-of-service"
    className="hover:text-white transition"
  >
    Terms of Service
  </Link>
</li>

        </ul>

      </div>

    </div>

    {/* Bottom */}
    <div className="border-t border-gray-800 mt-14 pt-6 text-center text-gray-500 text-sm">

      © 2025 ilinq.team — All rights reserved.

    </div>

  </div>

</footer>

    </main>
  );
}