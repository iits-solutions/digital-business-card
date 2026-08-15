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

   const plan = coupon.allowedPlans;

if (!plan) {
  return NextResponse.json(
    {
      error:
        "Coupon does not specify a subscription plan",
    },
    {
      status: 400,
    }
  );
}

const selectedPlan =
  await prisma.planLimit.findUnique({
    where: {
      plan_name: plan,
    },
  });

if (!selectedPlan) {
  return NextResponse.json(
    {
      error:
        "Subscription plan configuration not found",
    },
    {
      status: 400,
    }
  );
}

if (!selectedPlan.active) {
  return NextResponse.json(
    {
      error:
        "Subscription plan is inactive",
    },
    {
      status: 400,
    }
  );
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
    return NextResponse.json(
      {
        error:
          "Invalid coupon duration",
      },
      {
        status: 400,
      }
    );
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

if (finalPrice !== 0) {
  return NextResponse.json(
    {
      error:
        "Coupon does not provide a free subscription",
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

    let expiresAt: Date | null = new Date();

switch (coupon.duration) {
  case "1_MONTH":
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    break;

  case "3_MONTHS":
    expiresAt.setMonth(expiresAt.getMonth() + 3);
    break;

  case "6_MONTHS":
    expiresAt.setMonth(expiresAt.getMonth() + 6);
    break;

  case "12_MONTHS":
    expiresAt.setMonth(expiresAt.getMonth() + 12);
    break;

  case "LIFETIME":
  expiresAt = null;
  break;

  default:
    expiresAt.setMonth(expiresAt.getMonth() + 1);
    break;
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

  subscriptionStartedAt:
    new Date(),
  subscriptionDuration:
  coupon.duration,  

  expiresAt,

},

    });
    await tx.user.update({

      where: {
        email: userEmail,
      },

      data: {

        plan,

        subscriptionStatus:
          "ACTIVE",

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