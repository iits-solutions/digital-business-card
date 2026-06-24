import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const profile = await prisma.businessProfile.findUnique({
    where: {
      id,
    },
  });

  if (!profile) {
    return new Response("Profile not found", {
      status: 404,
    });
  }

  const fullName =
    profile.displayName ||
    [profile.firstName, profile.middleName, profile.lastName]
      .filter(Boolean)
      .join(" ");

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
ORG:${profile.companyName}
TITLE:${profile.jobTitle}
TEL;TYPE=CELL:${profile.primaryPhone}
EMAIL:${profile.email}
URL:${profile.website || ""}
ADR:${profile.address || ""};${profile.city};${profile.country}
END:VCARD`;

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${fullName}.vcf"`,
    },
  });
}