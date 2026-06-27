import { templates } from "./templates";
import CorporateTemplate from "./templates/CorporateTemplate";
import { prisma } from "@/lib/prisma";

export default async function ProfessionalProfileView({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string }>;
}) {
  const { id } = await params;
const { template } = await searchParams;
  const profile = await prisma.businessProfile.findFirst({
    where: {
      id,
    },
  });

  if (!profile) {
    return (
      <div className="p-6 text-white">
        Professional Profile not found
      </div>
    );
  }

 const fullName =
  profile.displayName ||
  [
    profile.firstName,
    profile.middleName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

    const selectedTemplate =
  template || profile.templateId;

const Template =
  templates[
    selectedTemplate as keyof typeof templates
  ] || CorporateTemplate;

  return (
  <Template
    profile={profile}
    fullName={fullName}
  />
);
}