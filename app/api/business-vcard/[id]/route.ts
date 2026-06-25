import { prisma } from "@/lib/prisma";
import { Buffer } from "node:buffer";

async function getPhotoVCardField(
  imageUrl: string | null | undefined
): Promise<string> {
  if (!imageUrl) return "";

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return "";
    }

    const contentType =
      response.headers.get("content-type") || "image/jpeg";

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    const base64 = imageBuffer.toString("base64");

    return `PHOTO;ENCODING=b;TYPE=${contentType.replace(
      "image/",
      ""
    ).toUpperCase()}:${base64}`;
  } catch (error) {
    console.error("Unable to embed profile image:", error);
    return "";
  }
}

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

  const photoField = await getPhotoVCardField(profile.profileImage);

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
ORG:${profile.companyName}
TITLE:${profile.jobTitle}
TEL;TYPE=CELL:${profile.primaryPhone}
EMAIL:${profile.email}
URL:${profile.website || ""}
ADR:${profile.address || ""};${profile.city};${profile.country}
${photoField}
END:VCARD`;

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": `attachment; filename="${fullName}.vcf"`,
    },
  });
}