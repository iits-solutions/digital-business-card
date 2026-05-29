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

      type,

      value,

      usageLimit,

      expiresAt,

      allowedPlans,

      description,

    } = body;

    const coupon =
      await prisma.coupon.create({

        data: {

          code:
            code.toUpperCase(),

          type,

          value,

          usageLimit,

          expiresAt:
            expiresAt
              ? new Date(
                  expiresAt
                )
              : null,

          allowedPlans,

          description,

        },

      });

    return NextResponse.json({

      success: true,

      coupon,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

        error:
          "Coupon creation failed",

      },
      {

        status: 500,

      }
    );

  }

}