import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {

  const { username } =
    await params;

  const profile =
    await prisma.profile.findUnique({

      where: {
        username,
      },

    });

  if (!profile) {

    return NextResponse.redirect(
      new URL("/", request.url)
    );

  }

  // Increment NFC taps
  await prisma.analytics.update({

    where: {
      userId: profile.userId,
    },

    data: {

      nfcTaps: {
        increment: 1,
      },

    },

  });

  // Redirect to profile
  return NextResponse.redirect(
    new URL(`/${username}`, request.url)
  );
}