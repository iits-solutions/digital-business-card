import Link from "next/link";
export default function SubscriptionsPage() {

  return (

    <div>

      <h1 className="text-5xl font-bold mb-4">

        Subscription Management, Centralized billing and controls.

      </h1>
<div className="mt-8">
  
</div>
      <div className="space-y-6">
  <div>
    <h1 className="text-4xl font-bold text-white">
      
    </h1>

    <p className="text-gray-400 mt-2">
      
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <Link
      href="/admin/plans"
      className="block p-6 bg-[#0f1f4d] border border-blue-500 rounded-xl hover:border-blue-400"
    >
      <h2 className="text-xl font-bold text-white">
        Plans
      </h2>

      <p className="text-gray-300 mt-2">
        Manage pricing, limits and features.
      </p>
    </Link>

    <div className="p-6 bg-[#0f1f4d] border border-gray-700 rounded-xl opacity-60">
      <h2 className="text-xl font-bold text-white">
        Active Subscriptions
      </h2>

      <p className="text-gray-300 mt-2">
        Coming Soon
      </p>
    </div>

    <div className="p-6 bg-[#0f1f4d] border border-gray-700 rounded-xl opacity-60">
      <h2 className="text-xl font-bold text-white">
        Coupons
      </h2>

      <p className="text-gray-300 mt-2">
        Coming Soon
      </p>
    </div>

    <div className="p-6 bg-[#0f1f4d] border border-gray-700 rounded-xl opacity-60">
      <h2 className="text-xl font-bold text-white">
        Revenue
      </h2>

      <p className="text-gray-300 mt-2">
        Coming Soon
      </p>
    </div>

  </div>
</div>

    </div>

  );

}