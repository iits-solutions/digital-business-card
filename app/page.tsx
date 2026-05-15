import Link from "next/link";

import Navbar from "./components/Navbar";

export default function Home() {

  return (

    <main className="min-h-screen bg-black text-white">

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
<section className="py-32 px-6 bg-black">

  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-20">

      <h2 className="text-5xl font-bold mb-6">

        Simple Pricing

      </h2>

      <p className="text-gray-400 text-xl">

        Flexible plans for individuals and businesses.

      </p>

    </div>

    {/* Pricing Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">

      {/* Free */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-4">

          Free

        </h3>

        <p className="text-gray-400 mb-8">

          Perfect for getting started.

        </p>

        <h4 className="text-6xl font-bold mb-8">

          $0

        </h4>

        <ul className="space-y-4 text-gray-300 mb-10">

          <li>✓ Basic Profile</li>

          <li>✓ QR Sharing</li>

          <li>✓ Basic Theme</li>

          <li>✓ Limited Analytics</li>

        </ul>

        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-4 rounded-2xl">

          Get Started

        </button>

      </div>

      {/* Starter */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-4">

          Starter

        </h3>

        <p className="text-gray-400 mb-8">

          Best for freelancers.

        </p>

        <h4 className="text-6xl font-bold mb-8">

          $1

          <span className="text-xl text-gray-400">

            /month

          </span>

        </h4>

        <ul className="space-y-4 text-gray-300 mb-10">

          <li>✓ NFC Sharing</li>

          <li>✓ WhatsApp Button</li>

          <li>✓ Save Contact</li>

          <li>✓ More Social Links</li>

        </ul>

        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-4 rounded-2xl">

          Upgrade

        </button>

      </div>

      {/* Pro */}
      <div className="bg-white text-black rounded-3xl p-8 scale-105 shadow-2xl">

        <div className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full mb-6">

          Most Popular

        </div>

        <h3 className="text-3xl font-bold mb-4">

          Pro

        </h3>

        <p className="text-gray-600 mb-8">

          Best for professionals.

        </p>

        <h4 className="text-6xl font-bold mb-8">

          $2

          <span className="text-xl text-gray-500">

            /month

          </span>

        </h4>

        <ul className="space-y-4 mb-10">

          <li>✓ Premium Themes</li>

          <li>✓ Advanced Analytics</li>

          <li>✓ Custom Branding</li>

          <li>✓ Lead Tracking</li>

        </ul>

        <button className="w-full bg-black text-white hover:bg-gray-800 transition py-4 rounded-2xl">

          Upgrade Now

        </button>

      </div>

      {/* Premium */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-4">

          Premium

        </h3>

        <p className="text-gray-400 mb-8">

          For creators & agencies.

        </p>

        <h4 className="text-6xl font-bold mb-8">

          $5

          <span className="text-xl text-gray-400">

            /month

          </span>

        </h4>

        <ul className="space-y-4 text-gray-300 mb-10">

          <li>✓ NFC Tap Analytics</li>

          <li>✓ Multiple Profiles</li>

          <li>✓ Priority Support</li>

          <li>✓ AI Features Later</li>

        </ul>

        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-4 rounded-2xl">

          Go Premium

        </button>

      </div>

      {/* Company */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

        <h3 className="text-3xl font-bold mb-4">

          Company

        </h3>

        <p className="text-gray-400 mb-8">

          Best for teams and businesses.

        </p>

        <h4 className="text-5xl font-bold mb-8">

          Custom

        </h4>

        <ul className="space-y-4 text-gray-300 mb-10">

          <li>✓ Employee Profiles</li>

          <li>✓ Team Dashboard</li>

          <li>✓ Company Branding</li>

          <li>✓ Admin Panel</li>

        </ul>

        <button className="w-full border border-white/10 hover:bg-white hover:text-black transition py-4 rounded-2xl">

          Contact Sales

        </button>

      </div>

    </div>

  </div>

</section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-black px-6 py-16">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

          <div>

            <h3 className="text-2xl font-bold mb-4">

              ILinq.Team

            </h3>

            <p className="text-gray-400">

              Smart digital business cards powered by NFC and QR technology.

            </p>

          </div>

          <div>

            <h4 className="text-xl font-semibold mb-4">

              Product

            </h4>

            <ul className="space-y-3 text-gray-400">

              <li><a href="#features">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Themes</a></li>

            </ul>

          </div>

          <div>

            <h4 className="text-xl font-semibold mb-4">

              Company

            </h4>

            <ul className="space-y-3 text-gray-400">

              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Support</a></li>

            </ul>

          </div>

          <div>

            <h4 className="text-xl font-semibold mb-4">

              Legal

            </h4>

            <ul className="space-y-3 text-gray-400">

              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>

            </ul>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

          © 2025 ILinq. All rights reserved.

        </div>

      </footer>

    </main>
  );
}