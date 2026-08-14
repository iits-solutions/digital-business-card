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
  billing,
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

const selectedPlan =
  await prisma.planLimit.findUnique({

    where: {
      plan_name: plan,
    },

  });

if (!selectedPlan) {

  return NextResponse.json({

    valid: false,

    message:
      "Subscription plan not found.",

  });

}

if (!selectedPlan.active) {

  return NextResponse.json({

    valid: false,

    message:
      "Subscription plan is inactive.",

  });

}

const originalPrice =
  Number(
    billing === "YEARLY"
      ? selectedPlan.yearly_price
      : selectedPlan.monthly_price
  );

let discount = 0;

if (coupon.type === "PERCENT") {

  discount =
    (originalPrice * coupon.value) /
    100;

} else {

  discount = coupon.value;

}

if (discount > originalPrice) {

  discount = originalPrice;

}

const finalPrice =
  Math.max(
    0,
    Number(
      (
        originalPrice - discount
      ).toFixed(2)
    )
  );

const isFreeSubscription =
  finalPrice === 0;

const requiresPayment =
  !isFreeSubscription;

    return NextResponse.json({

  valid: true,

  coupon,

  originalPrice,

  discount,

  finalPrice,

  isFreeSubscription,

  requiresPayment,

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