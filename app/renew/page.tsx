"use client";

import { useState } from "react";

export default function RenewPage() {

  const [billing,
    setBilling] =
    useState("MONTHLY");

  const [couponCode,
    setCouponCode] =
    useState("");

  const [couponMessage,
    setCouponMessage] =
    useState("");

  const [couponData,
    setCouponData] =
    useState<any>(null);

  const [selectedPlan,
    setSelectedPlan] =
    useState("PREMIUM");

  async function validateCoupon(
  plan: string
): Promise<any> {

    try {

      const response =
        await fetch(
          "/api/validate-coupon",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              code:
                couponCode,

              plan,

            }),

          }
        );

      const data =
        await response.json();

     if (data.valid) {

  setCouponData(data);

  setCouponMessage(
    "Coupon applied successfully."
  );

  return data;

} else {

  setCouponData(null);

  setCouponMessage(
    data.message
  );

  return null;

}

    } catch (error) {

      console.log(error);

      setCouponMessage(
        "Coupon validation failed."
      );
        return null;
    }

  }

  function getPrice(
    plan: string
  ) {

    const prices = {

      STARTER:
        billing === "MONTHLY"
          ? 2
          : 24,

      PRO:
        billing === "MONTHLY"
          ? 3.5
          : 42,

      PREMIUM:
        billing === "MONTHLY"
          ? 5.9
          : 70.8,

    };

    let finalPrice =
      prices[
        plan as keyof typeof prices
      ];

      return finalPrice.toFixed(2);

  }

  async function handleCheckout(
    plan: string
  ) {

    try {

      setSelectedPlan(plan);

      let validatedCoupon = null;

if (couponCode) {

  validatedCoupon =
    await validateCoupon(plan);

}

const finalPrice =
  validatedCoupon?.finalPrice ??
  couponData?.finalPrice ??
  Number(getPrice(plan));

if (
  validatedCoupon?.isFreeSubscription ||
  couponData?.isFreeSubscription ||
  finalPrice <= 0
)
 {
       const response =
          await fetch(
            "/api/free-checkout",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({
              plan,
              billing,
              couponCode,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          alert(
            "VIP subscription activated successfully."
          );

          window.location.href =
            "/dashboard";

          return;

        } else {

          alert(
            data.error ||
            "Free activation failed."
          );

          return;

        }

      }

      const response =
        await fetch(
          "/api/create-checkout",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              plan,
              billing,

            }),

          }
        );

      const data =
        await response.json();

      if (data.url) {

        window.location.href =
          data.url;

      } else {

        alert(
          "Checkout creation failed."
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    }

  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">

          <h1 className="text-5xl font-bold mb-4">

            Choose Your Subscription Plan

          </h1>

          <p className="text-gray-400 text-xl">

            Upgrade, renew, or activate your NFC subscription.

          </p>

        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">

          <div className="bg-[#081028] rounded-2xl p-2 flex gap-2">

            <button
              onClick={() =>
                setBilling("MONTHLY")
              }
              className={`px-6 py-3 rounded-xl font-semibold ${
                billing === "MONTHLY"
                  ? "bg-blue-600"
                  : "bg-transparent"
              }`}
            >

              Monthly

            </button>

            <button
              onClick={() =>
                setBilling("YEARLY")
              }
              className={`px-6 py-3 rounded-xl font-semibold ${
                billing === "YEARLY"
                  ? "bg-blue-600"
                  : "bg-transparent"
              }`}
            >

              Yearly

            </button>

          </div>

        </div>

        {/* Coupon */}
        <div className="max-w-xl mx-auto mb-12">

          <div className="bg-[#081028] rounded-3xl p-6 border border-white/10">

<select
  value={selectedPlan}
  onChange={(e) =>
    setSelectedPlan(
      e.target.value
    )
  }
  className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white outline-none mb-4"
>

  <option value="STARTER">

    Starter

  </option>

  <option value="PRO">

    Pro

  </option>

  <option value="PREMIUM">

    Premium

  </option>

</select>

            <h2 className="text-2xl font-bold mb-4">

              Coupon Code

            </h2>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(
                    e.target.value
                  )
                }
                className="flex-1 bg-black border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
              />

              <button
                onClick={() =>
                  validateCoupon(
                    selectedPlan
                  )
                }
                className="bg-green-600 hover:bg-green-700 transition px-6 py-4 rounded-2xl font-semibold"
              >

                Apply

              </button>

            </div>

            {couponMessage && (

              <p className="mt-4 text-sm text-gray-300">

                {couponMessage}

              </p>

            )}

          </div>

        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* STARTER */}
          <div className="bg-[#081028] rounded-3xl p-8 border border-white/10">

            <h2 className="text-3xl font-bold mb-4">

              Starter

            </h2>

            <div className="text-5xl font-bold mb-6">

              ${getPrice("STARTER")}

            </div>

            <button
              onClick={() =>
                handleCheckout(
                  "STARTER"
                )
              }
              className="w-full bg-blue-600 py-4 rounded-2xl text-lg font-semibold"
            >

              Select Plan

            </button>

          </div>

          {/* PRO */}
          <div className="bg-white text-black rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-4">

              Pro

            </h2>

            <div className="text-5xl font-bold mb-6">

              ${getPrice("PRO")}

            </div>

            <button
              onClick={() =>
                handleCheckout(
                  "PRO"
                )
              }
              className="w-full bg-black text-white py-4 rounded-2xl text-lg font-semibold"
            >

              Select Plan

            </button>

          </div>

          {/* PREMIUM */}
          <div className="bg-[#081028] rounded-3xl p-8 border border-white/10">

            <h2 className="text-3xl font-bold mb-4">

              Premium

            </h2>

            <div className="text-5xl font-bold mb-6">

              ${getPrice("PREMIUM")}

            </div>

            <button
              onClick={() =>
                handleCheckout(
                  "PREMIUM"
                )
              }
              className="w-full bg-blue-600 py-4 rounded-2xl text-lg font-semibold"
            >

              Select Plan

            </button>

          </div>

        </div>

      </div>

    </main>

  );

}