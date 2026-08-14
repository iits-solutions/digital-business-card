import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      token: string;
    }>;
  }
) {
  const { token } = await context.params;

  try {
    const card = await prisma.nfcCard.findUnique({
      where: {
        token,
      },
      include: {
        activeBusinessProfile: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    // CARD NOT FOUND
    if (!card) {
      return NextResponse.json(
        {
          error: "Card not found",
        },
        {
          status: 404,
        }
      );
    }

    // CARD INACTIVE
    if (card.status !== "ACTIVE") {
      return NextResponse.json(
        {
          error: "Card inactive",
        },
        {
          status: 403,
        }
      );
    }

    // Determine the correct profile
    const profileType = card.activeBusinessProfile
      ? "business"
      : "default";

    const username =
      card.activeBusinessProfile?.slug ??
      card.user.profile?.username;

    if (!username) {
      return NextResponse.json(
        {
          error: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    // LIFETIME ACCESS
    if (card.lifetimeAccess) {
      return NextResponse.json({
        username,
        profileType,
      });
    }

    // TRIAL ACCESS
    if (
      card.trialEndsAt &&
      new Date(card.trialEndsAt) > new Date()
    ) {
      return NextResponse.json({
        username,
        profileType,
      });
    }

    // EXPIRED SUBSCRIPTION
    if (
      card.expiresAt &&
      new Date(card.expiresAt) < new Date()
    ) {
      return NextResponse.json(
        {
          error: "Subscription expired",
          expired: true,
        },
        {
          status: 403,
        }
      );
    }

    // VALID ACCESS
    return NextResponse.json({
      username,
      profileType,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}