import { prisma } from "@/lib/prisma";
import { updatePlan } from "./actions";

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ planName: string }>;
}) {
  const { planName } = await params;

  const plan = await prisma.planLimit.findUnique({
    where: {
      plan_name: planName,
    },
  });

  if (!plan) {
    return (
      <div className="p-6">
        <h1>Plan not found</h1>
      </div>
    );
  }
async function saveMonthlyPrice(formData: FormData) {
  "use server";

  await updatePlan(plan.plan_name, {
    displayName: String(
      formData.get("displayName")
    ),

    monthlyPrice: Number(
      formData.get("monthlyPrice")
    ),

    yearlyPrice: Number(
      formData.get("yearlyPrice")
    ),

    maxProfiles: Number(
      formData.get("maxProfiles")
    ),

    maxQrCodes: Number(
      formData.get("maxQrCodes")
    ),

    maxLeads: Number(
      formData.get("maxLeads")
    ),
    nfcEnabled: formData.get("nfcEnabled") === "on",

teamEnabled: formData.get("teamEnabled") === "on",

companyEnabled:
  formData.get("companyEnabled") === "on",

apiEnabled:
  formData.get("apiEnabled") === "on",

active:
  formData.get("active") === "on",
  });
}
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Plan: {plan.display_name}
      </h1>

      <div className="space-y-2">
        <p>Internal Name: {plan.plan_name}</p>

        <form action={saveMonthlyPrice}>
  <div className="space-y-4">

  <div>
    <label className="block mb-2">
      Display Name
    </label>

    <input
      name="displayName"
      defaultValue={plan.display_name ?? ""}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <div>
    <label className="block mb-2">
      Monthly Price
    </label>

    <input
      name="monthlyPrice"
      type="number"
      step="0.01"
      defaultValue={plan.monthly_price?.toString()}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <div>
    <label className="block mb-2">
      Yearly Price
    </label>

    <input
      name="yearlyPrice"
      type="number"
      step="0.01"
      defaultValue={plan.yearly_price?.toString()}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <div>
    <label className="block mb-2">
      Profiles
    </label>

    <input
      name="maxProfiles"
      type="number"
      defaultValue={plan.max_profiles ?? 0}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <div>
    <label className="block mb-2">
      QR Codes
    </label>

    <input
      name="maxQrCodes"
      type="number"
      defaultValue={plan.max_qr_codes ?? 0}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>

  <div>
    <label className="block mb-2">
      Leads
    </label>

    <input
      name="maxLeads"
      type="number"
      defaultValue={plan.max_leads ?? 0}
      className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white w-full"
    />
  </div>
<div className="space-y-3">

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="nfcEnabled"
      defaultChecked={plan.nfc_enabled ?? false}
    />
    NFC Enabled
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="teamEnabled"
      defaultChecked={plan.team_enabled ?? false}
    />
    Team Enabled
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="companyEnabled"
      defaultChecked={plan.company_enabled ?? false}
    />
    Company Enabled
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="apiEnabled"
      defaultChecked={plan.api_enabled ?? false}
    />
    API Enabled
  </label>

  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="active"
      defaultChecked={plan.active ?? false}
    />
    Active
  </label>

</div>
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
  >
    Save Changes
  </button>

</div>
</form>
<p>
  Display Name: {plan.display_name}
</p>

        <p>
          Monthly Price: $
          {plan.monthly_price?.toString()}
        </p>
        <p>
          Yearly Price: $
          {plan.yearly_price?.toString()}
        </p>

        <p>Profiles: {plan.max_profiles}</p>

        <p>QR Codes: {plan.max_qr_codes}</p>

        <p>Leads: {plan.max_leads}</p>

        <p>
          NFC Enabled:{" "}
          {plan.nfc_enabled ? "Yes" : "No"}
        </p>

        <p>
          Team Enabled:{" "}
          {plan.team_enabled ? "Yes" : "No"}
        </p>
      </div>
      
    </div>
  );
}