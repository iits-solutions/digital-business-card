import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      username: string;
    }>;
  }
) {

  const { username } =
    await context.params;

  const profile =
    await prisma.profile.findFirst({

      where: {

        username: {
          equals: username,
          mode: "insensitive",
        },

      },

      include: {
        user: true,
      },

    });

  if (!profile) {

    return new Response(
      "Profile not found",
      {
        status: 404,
      }
    );

  }

  // MOBILE SAFE VCARD
  const vcf =
`BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName || ""}
ORG:${profile.company || ""}
TITLE:${profile.jobTitle || ""}
TEL:${profile.phone || ""}
EMAIL:${profile.user?.email || ""}
END:VCARD`;

  return new Response(vcf, {

    headers: {

      "Content-Type":
        "text/vcard",

      "Content-Disposition":
        `attachment; filename="${username}.vcf"`,

    },

  });

}