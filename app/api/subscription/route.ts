import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const card =
      await prisma.nfcCard.findFirst({
        where: {
          user: {
            email: session.user.email,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!card) {
      return NextResponse.json({
        plan: "FREE",
        status: "ACTIVE",
        subscriptionStartedAt: null,
        expiresAt: null,
        billingCycle: null,
        lifetimeAccess: false,
      });
    }

    return NextResponse.json({
  plan: card.plan,
  status: card.status,
  subscriptionStartedAt:
    card.subscriptionStartedAt,
  expiresAt: card.expiresAt,
  subscriptionDuration:
    card.subscriptionDuration,
  billingCycle: card.billingCycle,
  lifetimeAccess:
    card.lifetimeAccess,
});

  } catch (error) {
    console.error(
      "Subscription API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load subscription",
      },
      {
        status: 500,
      }
    );
  }
}