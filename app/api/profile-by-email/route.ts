import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url);

  const email =
    searchParams.get("email");

  if (!email) {

    return NextResponse.json(
      null
    );

  }

  const profile =
    await prisma.profile.findFirst({

      where: {
        user: {
          email,
        },
      },

    });

  return NextResponse.json({
    username:
      profile?.username || "",
  });

}