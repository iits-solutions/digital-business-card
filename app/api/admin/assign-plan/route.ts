import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      userId,
      plan,
    } = body;

    const expiresAt =
      new Date();

    expiresAt.setFullYear(
      expiresAt.getFullYear() + 1
    );

    const existingCard =
      await prisma.nfcCard.findFirst({

        where: {

          userId,

        },

      });

    if (existingCard) {

      await prisma.nfcCard.update({

        where: {

          id:
            existingCard.id,

        },

        data: {

          status:
            "ACTIVE",

          plan,

          expiresAt,

        },

      });

    } else {

      await prisma.nfcCard.create({

        data: {

          userId,

          status:
            "ACTIVE",

          plan,

          expiresAt,

        },

      });

    }

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

        error:
          "Failed to assign plan",

      },
      {

        status: 500,

      }
    );

  }

}