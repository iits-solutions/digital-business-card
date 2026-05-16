import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const user =
      await prisma.user.findUnique({

        where: {
          email: session.user.email,
        },

        include: {
          analytics: true,
        },

      });

    if (!user) {

      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );

    }

    return NextResponse.json({

      profileViews:
        user.analytics?.profileViews || 0,

      qrScans:
        user.analytics?.qrScans || 0,

      nfcTaps:
        user.analytics?.nfcTaps || 0,

      leads:
        user.analytics?.leads || 0,

      plan:
        user.plan || "FREE",

      subscriptionStatus:
        user.subscriptionStatus || null,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }

}