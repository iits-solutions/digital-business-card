import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const variantMap = {

  STARTER: {

    MONTHLY: "1707013",

    YEARLY: "1715432",

  },

  PRO: {

    MONTHLY: "1707106",

    YEARLY: "1715469",

  },

  PREMIUM: {

    MONTHLY: "1707123",

    YEARLY: "1715475",

  },

};

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      plan,
      billing,
      couponCode,
    } = body;
    const normalizedCouponCode =
          couponCode?.trim().toUpperCase();
   
    let coupon = null;

    if (normalizedCouponCode) {

  coupon =
    await prisma.coupon.findUnique({

      where: {

        code:
          normalizedCouponCode,

      },

    });

}

if (
  normalizedCouponCode &&
  !coupon
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
  coupon &&
  !coupon.active
) {

  return NextResponse.json(
    {
      error:
        "Coupon is inactive",
    },
    {
      status: 400,
    }
  );

}

if (
  coupon &&
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
  coupon &&
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
  coupon &&
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



    const planLimit =
  await prisma.planLimit.findUnique({
    where: {
      plan_name: plan,
    },
  });

  if (!planLimit) {

  return NextResponse.json(
    {
      error:
        "Plan configuration not found",
    },
    {
      status: 400,
    }
  );

}

const originalPrice =
  billing === "MONTHLY"
    ? Number(planLimit.monthly_price)
    : Number(planLimit.yearly_price);

    let finalPrice =
  originalPrice;

if (coupon) {

  finalPrice =
    Math.max(
      0,
      originalPrice -
        Number(coupon.value)
    );

}

const variantId =
  variantMap[
    plan as keyof typeof variantMap
  ]?.[
    billing as
      "MONTHLY"
      | "YEARLY"
  ];

    if (!variantId) {

      return NextResponse.json(
        {
          error:
            "Invalid plan or billing",
        },
        {
          status: 400,
        }
      );

    }

    const response =
      await fetch(
        "https://api.lemonsqueezy.com/v1/checkouts",
        {

          method: "POST",

          headers: {

            Accept:
              "application/vnd.api+json",

            "Content-Type":
              "application/vnd.api+json",

            Authorization:
              `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,

          },

          body: JSON.stringify({

            data: {

              type: "checkouts",

              attributes: {

                checkout_data: {

                  custom: {

                    plan,

                    billing,

                  },

                },

              },

              relationships: {

                store: {

                  data: {

                    type: "stores",

                    id:
                      process.env
                        .LEMON_SQUEEZY_STORE_ID,

                  },

                },

                variant: {

                  data: {

                    type: "variants",

                    id:
                      variantId,

                  },

                },

              },

            },

          }),

        }
      );

    const data =
      await response.json();

    return NextResponse.json({

      url:
        data.data.attributes.url,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        error:
          "Checkout creation failed",

      },
      {

        status: 500,

      }
    );

  }

}