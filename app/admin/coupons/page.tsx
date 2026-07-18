"use client";

import {
  useEffect,
  useState,
} from "react";
import CouponCard from "@/components/admin/CouponCard";
export default function CouponsPage() {

  const [form,
    setForm] = useState({

      code: "",

      type: "PERCENT",

      value: 10,

      usageLimit: "",

      expiresAt: "",

      allowedPlans: "",

      purpose: "Discount",

      duration: "1_MONTH",

      description: "",

    });

  const [message,
    setMessage] =
    useState("");

  const [coupons,
  setCoupons] =
  useState<any[]>([]);

  const [editingCouponId, setEditingCouponId] =
  useState<string | null>(null);

const durationLabels: Record<string, string> = {
  "1_MONTH": "1 Month",
  "3_MONTHS": "3 Months",
  "6_MONTHS": "6 Months",
  "12_MONTHS": "12 Months",
  "LIFETIME": "Lifetime",
};

async function loadCoupons() {

  try {

    const response =
      await fetch(
        "/api/coupons"
      );

    const data =
      await response.json();

    if (data.success) {

      setCoupons(
        data.coupons
      );

    }

  } catch (error) {

    console.log(error);

  }

}

async function toggleCoupon(
  id: string
) {

  try {

    const response =
      await fetch(
        "/api/toggle-coupon",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            id,

          }),

        }

        

      );

    const data =
      await response.json();

    if (data.success) {

      loadCoupons();

    }

  } catch (error) {

    console.log(error);

  }

}

function editCoupon(coupon: any) {
  setEditingCouponId(coupon.id);

  setForm({
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    usageLimit: coupon.usageLimit ?? "",
    expiresAt: coupon.expiresAt
      ? new Date(coupon.expiresAt)
          .toISOString()
          .slice(0, 16)
      : "",
    allowedPlans: coupon.allowedPlans ?? "",
    purpose: coupon.purpose,
    duration: coupon.duration,
    description: coupon.description ?? "",
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function deleteCoupon(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this coupon?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch("/api/delete-coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.success) {
      loadCoupons();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to delete coupon.");
  }
}

useEffect(() => {

  loadCoupons();

}, []);

  async function createCoupon() {

    try {

      const response =
        await fetch(
          "/api/create-coupon",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              ...form,

              value:
                Number(
                  form.value
                ),

              usageLimit:
                form.usageLimit
                  ? Number(
                      form.usageLimit
                    )
                  : null,

            }),

          }
        );

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "Coupon created successfully."
        );
        loadCoupons();
        setForm({

          code: "",

          type: "PERCENT",

          value: 10,

          usageLimit: "",

          expiresAt: "",

          allowedPlans: "",

          purpose: "Discount",

          duration: "1_MONTH",

          description: "",

        });

      } else {

        setMessage(
          data.error
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Coupon creation failed."
      );

    }

  }

async function updateCoupon() {
  try {
    const response = await fetch("/api/update-coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingCouponId,
        ...form,
        value: Number(form.value),
        usageLimit: form.usageLimit
          ? Number(form.usageLimit)
          : null,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Coupon updated successfully.");

      setEditingCouponId(null);

      loadCoupons();

      setForm({
        code: "",
        type: "PERCENT",
        value: 10,
        usageLimit: "",
        expiresAt: "",
        allowedPlans: "",
        purpose: "Discount",
        duration: "1_MONTH",
        description: "",
      });
    } else {
      setMessage(data.error);
    }
  } catch (error) {
    console.error(error);
    setMessage("Coupon update failed.");
  }
}

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-3xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">

            Coupon Dashboard

          </h1>

          <p className="text-gray-400 text-lg">

            Create marketing campaigns,
            VIP access codes,
            and discount coupons.

          </p>

        </div>

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 space-y-6">

          <div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Coupon Code
  </label>

  <p className="text-xs text-gray-400">
    A unique code customers will enter during checkout (e.g. GIFT2026, BETA50).
  </p>

  <input
    type="text"
    placeholder="Coupon Code"
    value={form.code}
    onChange={(e) =>
      setForm({
        ...form,
        code: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  />

</div>

          <div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Discount Type
  </label>

  <p className="text-xs text-gray-400">
    Choose whether the coupon provides a percentage discount or a fixed amount.
  </p>

  <select
    value={form.type}
    onChange={(e) =>
      setForm({
        ...form,
        type: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  >
    <option value="PERCENT">
      Percentage Discount
    </option>

    <option value="FIXED">
      Fixed Discount
    </option>

  </select>

</div>

          <div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Discount Value
  </label>

  <p className="text-xs text-gray-400">
    Enter the discount amount. Example: 10 = 10%, 50 = 50%, 100 = Free subscription.
  </p>

  <input
    type="number"
    placeholder="Discount Value"
    value={form.value}
    onChange={(e) =>
      setForm({
        ...form,
        value: Number(e.target.value),
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  />

</div>

          <div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Maximum Redemptions
  </label>

  <p className="text-xs text-gray-400">
    Maximum number of times this coupon can be used. Leave empty for unlimited usage.
  </p>

  <input
    type="number"
    placeholder="Usage Limit"
    value={form.usageLimit}
    onChange={(e) =>
      setForm({
        ...form,
        usageLimit: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  />

</div>

          <div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Expiry Date
  </label>

  <p className="text-xs text-gray-400">
    The coupon cannot be redeemed after this date and time. Leave empty if it never expires.
  </p>

  <input
    type="datetime-local"
    value={form.expiresAt}
    onChange={(e) =>
      setForm({
        ...form,
        expiresAt: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  />

</div>

<div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Eligible Subscription Plan
  </label>

  <p className="text-xs text-gray-400">
    Select which subscription plan this coupon can be applied to. Choose "All Plans" to make it valid for every subscription.
  </p>

  <select
    value={form.allowedPlans}
    onChange={(e) =>
      setForm({
        ...form,
        allowedPlans: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  >
    <option value="">All Plans</option>
    <option value="STARTER">Starter</option>
    <option value="PRO">Professional</option>
    <option value="PREMIUM">Business</option>
  </select>

</div>

<div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Coupon Purpose
  </label>

  <p className="text-xs text-gray-400">
    Helps administrators categorize the coupon. This does not affect pricing but makes management easier.
  </p>

  <select
    value={form.purpose}
    onChange={(e) =>
      setForm({
        ...form,
        purpose: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  >
    <option value="Discount">Discount</option>
    <option value="Gift">Gift</option>
    <option value="VIP">VIP</option>
    <option value="Beta Tester">Beta Tester</option>
    <option value="Employee">Employee</option>
    <option value="Partner">Partner</option>
  </select>

</div>
<div className="space-y-2">

  <label className="block text-sm font-semibold text-white">
    Subscription Duration
  </label>

  <p className="text-xs text-gray-400">
    Defines how long the subscription remains active after the coupon is redeemed.
  </p>

  <select
    value={form.duration}
    onChange={(e) =>
      setForm({
        ...form,
        duration: e.target.value,
      })
    }
    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
  >
    <option value="1_MONTH">1 Month</option>
    <option value="3_MONTHS">3 Months</option>
    <option value="6_MONTHS">6 Months</option>
    <option value="12_MONTHS">12 Months</option>
    <option value="LIFETIME">Lifetime</option>
  </select>

</div>

                  <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none min-h-[120px]"
          />

          <button
            onClick={
  editingCouponId
    ? updateCoupon
    : createCoupon
}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl text-lg font-semibold"
          >

            {editingCouponId ? "Update Coupon" : "Create Coupon"}

          </button>

          {message && (

            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-gray-300">

              {message}

            </div>

          )}

        </div>
<div className="mt-12 bg-[#081028] border border-white/10 rounded-3xl p-8">

  <h2 className="text-3xl font-bold mb-8">

    Existing Coupons

  </h2>

  <div className="space-y-4">

    {coupons.length ? (

      coupons.map((coupon) => (
  <CouponCard
    key={coupon.id}
    coupon={coupon}
    durationLabels={durationLabels}
    onToggle={toggleCoupon}
    onEdit={editCoupon}
    onDelete={deleteCoupon}
  />
))

    ) : (

      <div className="text-gray-400">

        No coupons found.

      </div>

    )}

  </div>

</div>

      </div>

    </main>

  );

}