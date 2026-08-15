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

const plan = coupon.allowedPlans;

if (!plan) {
  return NextResponse.json({
    valid: false,
    message:
      "This coupon does not specify a subscription plan.",
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
      "Subscription plan configuration not found.",
  });
}

if (!selectedPlan.active) {
  return NextResponse.json({
    valid: false,
    message:
      "Subscription plan is inactive.",
  });
}
let originalPrice = 0;

switch (coupon.duration) {
  case "1_MONTH":
    originalPrice =
      Number(selectedPlan.monthly_price);
    break;

  case "3_MONTHS":
    originalPrice =
      Number(selectedPlan.monthly_price) * 3;
    break;

  case "6_MONTHS":
    originalPrice =
      Number(selectedPlan.monthly_price) * 6;
    break;

  case "12_MONTHS":
    originalPrice =
      Number(selectedPlan.yearly_price);
    break;

  case "LIFETIME":
    originalPrice = 0;
    break;

  default:
    return NextResponse.json({
      valid: false,
      message:
        "Invalid coupon duration.",
    });
}

let discount = 0;

if (coupon.type === "PERCENT") {
  discount =
    (originalPrice * coupon.value) / 100;
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

  plan,

  duration: coupon.duration,

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