"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ManageSubscriptionPage() {
  const { data: session } = useSession();

  const plan =
    (session?.user as any)?.plan || "FREE";

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-blue-700 rounded-lg bg-blue-950 hover:bg-blue-900 transition text-blue-300 hover:text-white"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-5xl font-bold mb-4">
          Manage Subscription
        </h1>

        <p className="text-gray-400 mb-10">
          View your current plan and upcoming subscription options.
        </p>

        {/* Current Plan */}
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-2">
            Current Plan
          </h2>

          <p className="text-4xl font-bold text-blue-300">
            {plan}
          </p>

          <p className="text-gray-400 mt-2">
            Status: Active
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
            <h3 className="text-3xl font-bold mb-4">
              Professional
            </h3>

            <p className="text-4xl font-bold mb-6">
              $4.99
              <span className="text-lg text-gray-400">
                {" "} / month
              </span>
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ NFC Support</li>
              <li>✔ Analytics</li>
              <li>✔ Custom Branding</li>
              <li>✔ Priority Support</li>
            </ul>

            <button
              disabled
              className="w-full bg-gray-700 text-gray-300 py-2 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

          <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
            <h3 className="text-3xl font-bold mb-4">
              Business
            </h3>

            <p className="text-4xl font-bold mb-6">
              $14.99
              <span className="text-lg text-gray-400">
                {" "} / month
              </span>
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Team Management</li>
              <li>✔ Multiple Profiles</li>
              <li>✔ Advanced Analytics</li>
              <li>✔ Premium Support</li>
            </ul>

            <button
              disabled
              className="w-full bg-gray-700 text-gray-300 py-2 rounded-lg cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>

          <div className="bg-blue-950 border border-blue-800 rounded-xl p-6">
            <h3 className="text-3xl font-bold mb-4">
              Enterprise
            </h3>

            <p className="text-2xl font-bold mb-6">
              Custom Quote
            </p>

            <ul className="space-y-2 text-gray-300 mb-6">
              <li>✔ Team Dashboard</li>
              <li>✔ Custom NFC Cards</li>
              <li>✔ Dedicated Support</li>
              <li>✔ Custom Integrations</li>
            </ul>

            <Link
              href="/contact"
              className="block text-center bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
            >
              Contact Sales
            </Link>
          </div>

        </div>

        <div className="mt-10 bg-yellow-950 border border-yellow-700 rounded-xl p-6">
          <h3 className="font-bold text-xl mb-2">
            Public Beta Notice
          </h3>

          <p className="text-yellow-200">
            iLinq.Team is currently operating in Public Beta.

Professional and Business subscriptions will be activated once payment processing is finalized.

Enterprise solutions are available immediately through direct consultation.
          </p>
        </div>

      </div>

    </main>
  );
}