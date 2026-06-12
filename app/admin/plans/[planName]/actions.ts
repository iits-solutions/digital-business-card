"use server";

import { prisma } from "@/lib/prisma";

export async function updatePlan(
  planName: string,
  data: {
  displayName: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxProfiles: number;
  maxQrCodes: number;
  maxLeads: number;

  nfcEnabled: boolean;
  teamEnabled: boolean;
  companyEnabled: boolean;
  apiEnabled: boolean;
  active: boolean;
}
) {
  await prisma.planLimit.update({
    where: {
      plan_name: planName,
    },
    data: {
  display_name: data.displayName,
  monthly_price: data.monthlyPrice,
  yearly_price: data.yearlyPrice,
  max_profiles: data.maxProfiles,
  max_qr_codes: data.maxQrCodes,
  max_leads: data.maxLeads,

  nfc_enabled: data.nfcEnabled,
  team_enabled: data.teamEnabled,
  company_enabled: data.companyEnabled,
  api_enabled: data.apiEnabled,
  active: data.active,
},
  });
}