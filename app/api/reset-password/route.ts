import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {

      token,
      password,

    } = body;

    // Find user with token
    const user =
      await prisma.user.findFirst({

        where: {

          resetToken: token,

          resetTokenExpiry: {

            gt: new Date(),

          },

        },

      });

    // Invalid token
    if (!user) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Invalid or expired token",

        },
        {

          status: 400,

        }
      );

    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Update password
    await prisma.user.update({

      where: {
        id: user.id,
      },

      data: {

        password:
          hashedPassword,

        resetToken: null,

        resetTokenExpiry:
          null,

      },

    });

    return NextResponse.json({

      success: true,

      message:
        "Password updated successfully",

    });

  } catch (error) {

    console.log(
      "RESET PASSWORD ERROR:",
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