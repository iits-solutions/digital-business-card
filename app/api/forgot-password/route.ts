import { NextResponse } from "next/server";

import crypto from "crypto";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const { email } =
      body;

    // Find user
    const user =
      await prisma.user.findUnique({

        where: {
          email,
        },

      });

    // No user found
    if (!user) {

      return NextResponse.json(
        {

          success: false,

          error:
            "No account found with this email",

        },
        {

          status: 404,

        }
      );

    }

    // Generate token
    const resetToken =
      crypto.randomBytes(32)
        .toString("hex");

    // Expiry (30 mins)
    const resetTokenExpiry =
      new Date(
        Date.now() +
        1000 * 60 * 30
      );

    // Save token
    await prisma.user.update({

      where: {
        email,
      },

      data: {

        resetToken,

        resetTokenExpiry,

      },

    });

    // Reset URL
    const resetUrl =
      `https://ilinq.team/reset-password?token=${resetToken}`;

    return NextResponse.json({

      success: true,

      message:
        "Reset link generated",

      resetUrl,

    });

  } catch (error) {

    console.log(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {

        success: false,

        error:
          "Something went wrong",

      },
      {

        status: 500,

      }
    );

  }

}