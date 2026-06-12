import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PlansPage() {
  const plans = await prisma.planLimit.findMany({
    orderBy: {
      display_order: "asc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Subscription Plans
      </h1>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div
            key={plan.plan_name}
            className="border border-white/20 rounded-xl p-6 bg-[#071633] mb-4"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {plan.display_name}
            </h2>
<Link
  href={`/admin/plans/${plan.plan_name}`}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm mb-4 inline-block"
>
  Edit
</Link>
            <p>
              Internal Name: {plan.plan_name}
            </p>

            <p>Monthly: ${plan.monthly_price?.toString()}</p>

            <p>Yearly: ${plan.yearly_price?.toString()}</p>

            <p>
              Profiles: {plan.max_profiles}
            </p>

            <p>
              QR Codes: {plan.max_qr_codes}
            </p>

            <p>
              Leads: {plan.max_leads}
            </p>

            <p>
              NFC: {plan.nfc_enabled ? "Yes" : "No"}
            </p>

            <p>
              Active: {plan.active ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}