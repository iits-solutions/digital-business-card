import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      code,
      plan,
    } = body;

    const coupon =
      await prisma.coupon.findUnique({

        where: {

          code:
            code.toUpperCase(),

        },

      });

    if (!coupon) {

      return NextResponse.json({

        valid: false,

        message:
          "Invalid coupon code.",

      });

    }

    if (!coupon.active) {

      return NextResponse.json({

        valid: false,

        message:
          "Coupon is inactive.",

      });

    }

    if (
      coupon.expiresAt &&
      new Date() >
        coupon.expiresAt
    ) {

      return NextResponse.json({

        valid: false,

        message:
          "Coupon expired.",

      });

    }

    if (
      coupon.usageLimit &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {

      return NextResponse.json({

        valid: false,

        message:
          "Coupon usage limit reached.",

      });

    }

    if (
      coupon.allowedPlans &&
      coupon.allowedPlans !==
        plan
    ) {

      return NextResponse.json({

        valid: false,

        message:
          "Coupon not valid for this plan.",

      });

    }

    return NextResponse.json({

      valid: true,

      coupon,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      valid: false,

      message:
        "Coupon validation failed.",

    });

  }

}