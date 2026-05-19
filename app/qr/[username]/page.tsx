import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

interface Props {

  params: Promise<{
    username: string;
  }>;

}

export default async function QRPage({
  params,
}: Props) {

  const { username } =
    await params;

  // Find profile
  const profile =
    await prisma.profile.findFirst({

      where: {

        username: {
          equals:
            username,
          mode:
            "insensitive",
        },

      },

    });

  // If no profile found
  if (!profile) {

    redirect("/");

  }

  // Increment QR scans
  await prisma.analytics.upsert({

    where: {
      userId: profile.userId,
    },

    update: {

      qrScans: {
        increment: 1,
      },

    },

    create: {

      userId: profile.userId,

      profileViews: 0,

      qrScans: 1,

      nfcTaps: 0,

      leads: 0,

    },

  });

  // Redirect to profile
  redirect(`/${profile.username}`);

}