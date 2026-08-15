"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ManageSubscriptionPage() {
const { data: session } = useSession();
const [couponCode, setCouponCode] = useState("");
const [couponMessage, setCouponMessage] = useState("");
const [couponLoading, setCouponLoading] = useState(false);
const [couponResult, setCouponResult] = useState<any>(null);
const [activationLoading, setActivationLoading] = useState(false);
const [activationMessage, setActivationMessage] = useState("");

const [subscription, setSubscription] =
  useState<any>(null);

const [subscriptionLoading, setSubscriptionLoading] =
  useState(true);

  const plan =
    (session?.user as any)?.plan || "FREE";

    useEffect(() => {
  async function loadSubscription() {
    try {
      const response = await fetch(
        "/api/subscription"
      );

      const data = await response.json();

      if (response.ok) {
        setSubscription(data);
      }
    } catch (error) {
      console.error(
        "Unable to load subscription:",
        error
      );
    } finally {
      setSubscriptionLoading(false);
    }
  }

  loadSubscription();
}, []);

    async function applyCoupon() {
  if (!couponCode.trim()) {
    setCouponMessage("Please enter a coupon code.");
    setCouponResult(null);
    return;
  }

  setCouponLoading(true);
  setCouponMessage("");
  setCouponResult(null);
  setActivationMessage("");

  try {
    const response = await fetch("/api/validate-coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: couponCode.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.valid) {
      setCouponMessage(
        data.message || "Invalid coupon code."
      );
      return;
    }

    setCouponResult(data);

    setCouponMessage(
      data.isFreeSubscription
        ? "Coupon applied successfully. Your subscription is free."
        : "Coupon applied successfully."
    );
  } catch (error) {
    console.error(error);

    setCouponMessage(
      "Unable to validate coupon. Please try again."
    );
  } finally {
    setCouponLoading(false);
  }
}

async function activateCoupon() {
  if (!couponResult?.isFreeSubscription) {
    setActivationMessage(
      "Please apply a valid free coupon first."
    );
    return;
  }

  setActivationLoading(true);
  setActivationMessage("");

  try {
    const response = await fetch(
      "/api/free-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponCode: couponCode.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      setActivationMessage(
        data.error ||
          "Subscription activation failed."
      );
      return;
    }

    setActivationMessage(
      "Subscription activated successfully!"
    );

    setCouponMessage(
      "Your subscription is now active."
    );

    setCouponResult(null);
    setCouponCode("");

    window.location.reload();

  } catch (error) {
    console.error(error);

    setActivationMessage(
      "Unable to activate subscription. Please try again."
    );
  } finally {
    setActivationLoading(false);
  }
}
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

        {/* Current Subscription */}
<div className="bg-blue-950 border border-blue-800 rounded-xl p-6 mb-10">

  <h2 className="text-2xl font-bold mb-5">
    Current Subscription
  </h2>

  {subscriptionLoading ? (
    <p className="text-gray-400">
      Loading subscription details...
    </p>
  ) : (
    <div className="space-y-3">

      <div>
        <p className="text-sm text-gray-400">
          Plan
        </p>

        <p className="text-3xl font-bold text-blue-300">
          {subscription?.plan === "STARTER"
  ? "Professional"
  : subscription?.plan === "BUSINESS"
  ? "Business"
  : subscription?.plan === "FREE"
  ? "Free"
  : subscription?.plan || plan}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-400">
          Status
        </p>

        <p className="text-lg font-semibold text-green-400">
          {subscription?.status || "ACTIVE"}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-400">
          Started
        </p>

        <p className="text-lg text-white">
          {subscription?.subscriptionStartedAt
            ? new Date(
                subscription.subscriptionStartedAt
              ).toLocaleDateString()
            : "Not available"}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-400">
          Expires
        </p>

        <p className="text-lg text-white">
          {subscription?.lifetimeAccess
            ? "Never — Lifetime"
            : subscription?.expiresAt
            ? new Date(
                subscription.expiresAt
              ).toLocaleDateString()
            : "Not available"}
        </p>
      </div>

      <div>
  <p className="text-sm text-gray-400">
    Duration
  </p>

  <p className="text-lg text-white">
    {subscription?.subscriptionDuration === "LIFETIME"
      ? "Lifetime"
      : subscription?.subscriptionDuration === "1_MONTH"
      ? "1 Month"
      : subscription?.subscriptionDuration === "3_MONTHS"
      ? "3 Months"
      : subscription?.subscriptionDuration === "6_MONTHS"
      ? "6 Months"
      : subscription?.subscriptionDuration === "12_MONTHS"
      ? "12 Months"
      : "Subscription"}
  </p>
</div>

    </div>
  )}

</div>

        {/* Coupon */}
<div className="bg-[#081028] border border-blue-800 rounded-xl p-6 mb-10">
  <h2 className="text-2xl font-bold mb-2">
    Have a Coupon?
  </h2>

  <p className="text-gray-400 mb-5">
    Enter your coupon code to check your subscription offer.
  </p>

  <div className="flex flex-col md:flex-row gap-3">

    <input
      type="text"
      placeholder="Enter coupon code"
      value={couponCode}
      onChange={(e) => {
        setCouponCode(e.target.value.toUpperCase());
        setCouponResult(null);
        setCouponMessage("");
      }}
      className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
    />

    <button
      onClick={applyCoupon}
      disabled={couponLoading}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition"
    >
      {couponLoading ? "Checking..." : "Apply Coupon"}
    </button>

  </div>

  {couponMessage && (
    <div className="mt-4 bg-black/40 border border-white/10 rounded-lg p-4 text-gray-300">
      {couponMessage}
    </div>
  )}

  {couponResult && (
  <div className="mt-5 bg-green-950 border border-green-700 rounded-lg p-5">

    <h3 className="text-xl font-bold text-green-300 mb-3">
      Coupon Applied ✓
    </h3>

    <div className="space-y-2 text-gray-300">

      <p>
        Original Price: $
        {Number(couponResult.originalPrice).toFixed(2)}
      </p>

      <p>
        Discount: $
        {Number(couponResult.discount).toFixed(2)}
      </p>

      <p className="text-2xl font-bold text-white">
        Final Price:{" "}
        {couponResult.finalPrice === 0
          ? "FREE"
          : `$${Number(couponResult.finalPrice).toFixed(2)}`}
      </p>

      {couponResult.isFreeSubscription && (
        <button
          onClick={activateCoupon}
          disabled={activationLoading}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 py-3 rounded-lg font-semibold transition"
        >
          {activationLoading
            ? "Activating..."
            : "Activate Subscription"}
        </button>
      )}

    </div>

  </div>
)}

{activationMessage && (
  <div className="mt-4 bg-black/40 border border-green-700 rounded-lg p-4 text-green-300">
    {activationMessage}
  </div>
)}
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