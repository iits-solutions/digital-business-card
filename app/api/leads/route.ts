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

    // Find profile owner
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
        { error: "User not found" },
        { status: 404 }
      );

    }

    // Save lead
    const lead =
      await prisma.lead.create({

        data: {

          name,
          email,
          phone,
          company,

          userId: user.id,

        },

      });

    // Update analytics
    await prisma.analytics.updateMany({

      where: {
        userId: user.id,
      },

      data: {

        leads: {
          increment: 1,
        },

      },

    });

    return NextResponse.json({

      success: true,
      lead,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}