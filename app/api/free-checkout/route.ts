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

    const body =
      await req.json();

    const {
      plan,
      billing,
      couponCode,
    } = body;

    const coupon =
      await prisma.coupon.findUnique({

        where: {

          code:
            couponCode.toUpperCase(),

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

    await prisma.nfcCard.updateMany({

      where: {

        user: {

          email:
            session.user.email,

        },

      },

      data: {

        status:
          "ACTIVE",

        plan,

        expiresAt,

      },

    });

    await prisma.coupon.update({

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