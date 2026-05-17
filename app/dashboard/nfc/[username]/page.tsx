import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

interface Props {

  params: {
    username: string;
  };

}

export default async function NFCRedirectPage({
  params,
}: Props) {

  const { username } = params;

  // Find User
  const user =
    await prisma.user.findFirst({

      where: {
        email: {
          startsWith: username,
        },
      },

      include: {
        analytics: true,
      },

    });

  if (!user) {

    redirect("/");

  }

  // Increment NFC Taps
  if (user.analytics) {

    await prisma.analytics.update({

      where: {
        id: user.analytics.id,
      },

      data: {

        nfcTaps: {
          increment: 1,
        },

      },

    });

  }

  // Redirect to Public Profile
  redirect(`/${username}`);
}