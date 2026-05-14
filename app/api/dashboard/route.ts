import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const user = await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

      include: {
        analytics: true,
      },

    });

    if (!user?.analytics) {

      return NextResponse.json(
        { error: "Analytics not found" },
        { status: 404 }
      );

    }

    return NextResponse.json({

      profileViews: user.analytics.profileViews,
      qrScans: user.analytics.qrScans,
      nfcTaps: user.analytics.nfcTaps,
      leads: user.analytics.leads,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}