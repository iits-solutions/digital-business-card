"use client";

type Coupon = {
  id: string;
  code: string;
  description?: string;
  purpose: string;
  duration: string;
  allowedPlans?: string;
  type: string;
  value: number;
  usedCount: number;
  active: boolean;
};

type Props = {
  coupon: Coupon;
  durationLabels: Record<string, string>;
  onToggle: (id: string) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
};

export default function CouponCard({
  coupon,
  durationLabels,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#101827] p-6 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

        <div className="flex-1">

          <h3 className="text-2xl font-bold text-white">
            {coupon.code}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {coupon.description || "No description provided"}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
              {coupon.purpose}
            </span>

            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
              {durationLabels[coupon.duration] ?? coupon.duration}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
              {coupon.allowedPlans || "All Plans"}
            </span>

          </div>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            coupon.active
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {coupon.active ? "Active" : "Disabled"}
        </span>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-gray-500 text-xs uppercase">Type</p>
          <p className="mt-2 font-semibold">{coupon.type}</p>
        </div>

        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-gray-500 text-xs uppercase">Value</p>
          <p className="mt-2 font-semibold">{coupon.value}</p>
        </div>

        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-gray-500 text-xs uppercase">Used</p>
          <p className="mt-2 font-semibold">{coupon.usedCount}</p>
        </div>

        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-gray-500 text-xs uppercase">Status</p>

          <p
            className={`mt-2 font-semibold ${
              coupon.active
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coupon.active ? "Active" : "Inactive"}
          </p>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 border-t border-white/15 pt-6">

        <button
          onClick={() => onToggle(coupon.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            coupon.active
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {coupon.active ? "Disable" : "Enable"}
        </button>

        <button
          onClick={() => onEdit(coupon)}
          className="px-6 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(coupon.id)}
          className="px-6 py-3 rounded-xl font-semibold bg-red-700 hover:bg-red-800 transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}