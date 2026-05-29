import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const coupons =
      await prisma.coupon.findMany({

        orderBy: {

          createdAt:
            "desc",

        },

      });

    return NextResponse.json({

      success: true,

      coupons,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

        error:
          "Failed to load coupons",

      },
      {

        status: 500,

      }
    );

  }

}