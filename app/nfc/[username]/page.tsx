import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

interface Props {

  params: Promise<{
    username: string;
  }>;

}

export default async function NFCPage({
  params,
}: Props) {

  const { username } =
    await params;

  // Find profile
  const profile =
    await prisma.profile.findFirst({

      where: {

        username: {
          equals: username,
          mode: "insensitive",
        },

      },

    });

  // If profile not found
  if (!profile) {

    redirect("/");

  }

  // Increment NFC taps
  await prisma.analytics.upsert({

    where: {
      userId: profile.userId,
    },

    update: {

      nfcTaps: {
        increment: 1,
      },

    },

    create: {

      userId: profile.userId,

      profileViews: 0,

      qrScans: 0,

      nfcTaps: 1,

      leads: 0,

    },

  });

  // Redirect to profile
  redirect(`/p/${profile.username}`);

}