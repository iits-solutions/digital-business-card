import { templates } from "@/app/dashboard/business-profiles/[id]/view/templates";
import { prisma } from "@/lib/prisma";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const profile =
  await prisma.businessProfile.findFirst({
    where: {
      slug,
    },
  });

console.log("Public Slug:", slug);
console.log("Business Profile:", profile);

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Profile Not Found
      </div>
    );
  }

  const fullName = [
    profile.firstName,
    profile.middleName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

    const Template =
  templates[
    profile.templateId as keyof typeof templates
  ] || templates["compact-mobile-card"];
    console.log("Slug:", slug);
console.log("Template ID:", profile.templateId);
 return (
  <Template
    profile={profile}
    fullName={fullName}
  />
);
}