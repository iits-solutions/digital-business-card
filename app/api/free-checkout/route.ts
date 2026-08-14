import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request
) {

  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?.email
    ) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }
    
const userEmail = session.user.email;

    const body =
      await req.json();

    const {
      plan,
      billing,
      couponCode,
    } = body;

    const normalizedCouponCode =
  couponCode?.trim().toUpperCase();
    
    const coupon =
      await prisma.coupon.findUnique({

        where: {

          code:
  normalizedCouponCode,

        },

      });

    if (
      !coupon ||
      !coupon.active
    ) {

      return NextResponse.json(
        {

          error:
            "Invalid coupon",

        },
        {

          status: 400,

        }
      );

    }

    if (
      coupon.type !==
        "PERCENT"
      ||

      coupon.value < 100
    ) {

      return NextResponse.json(
        {

          error:
            "Coupon is not fully free",

        },

        {

          status: 400,

        }
      );

    }

if (
  coupon.allowedPlans &&
  coupon.allowedPlans !== plan
) {

  return NextResponse.json(
    {
      error:
        "Coupon is not valid for this plan",
    },
    {
      status: 400,
    }
  );

}

if (
  coupon.expiresAt &&
  coupon.expiresAt < new Date()
) {

  return NextResponse.json(
    {
      error:
        "Coupon has expired",
    },
    {
      status: 400,
    }
  );
}

if (
  coupon.usageLimit !== null &&
  coupon.usageLimit !== undefined &&
  coupon.usedCount >= coupon.usageLimit
) {

  return NextResponse.json(
    {
      error:
        "Coupon usage limit has been reached",
    },
    {
      status: 400,
    }
  );

}

    const expiresAt =
      new Date();

    if (
      billing === "YEARLY"
    ) {

      expiresAt.setMonth(
        expiresAt.getMonth() + 12
      );

    } else {

      expiresAt.setMonth(
        expiresAt.getMonth() + 1
      );

    }
await prisma.$transaction(async (tx) => {
    await tx.nfcCard.updateMany({

      where: {

        user: {

          email:
            userEmail,

        },

      },

      data: {

        status:
          "ACTIVE",

        plan,

        expiresAt,

      },

    });

    await tx.coupon.update({

      where: {

        id:
          coupon.id,

      },

      data: {

        usedCount: {

          increment: 1,

        },

      },

    });
    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        error:
          "Free activation failed",

      },
      {

        status: 500,

      }
    );

  }

}