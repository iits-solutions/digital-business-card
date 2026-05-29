import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const { id } =
      body;

    const coupon =
      await prisma.coupon.findUnique({

        where: { id },

      });

    if (!coupon) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Coupon not found",

        },
        {

          status: 404,

        }
      );

    }

    const updatedCoupon =
      await prisma.coupon.update({

        where: { id },

        data: {

          active:
            !coupon.active,

        },

      });

    return NextResponse.json({

      success: true,

      coupon:
        updatedCoupon,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

        error:
          "Failed to update coupon",

      },
      {

        status: 500,

      }
    );

  }

}