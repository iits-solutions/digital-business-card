import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      username,
      name,
      email,
      phone,
      company,
    } = body;

    const user =
      await prisma.user.findFirst({

        where: {
          email: {
            startsWith: username,
          },
        },

      });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );

    }

    await prisma.lead.create({

      data: {

        name,
        email,
        phone,
        company,

        userId: user.id,

      },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );

  }
}