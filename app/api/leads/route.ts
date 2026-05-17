import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    console.log("BODY:", body);

    const {
      username,
      name,
      email,
      phone,
      company,
    } = body;

    // Find profile by username
    const profile =
      await prisma.profile.findFirst({

        where: {
          username: {
            equals:
              username.toLowerCase(),
            mode: "insensitive",
          },
        },

        include: {
          user: true,
        },

      });

    console.log("PROFILE:", profile);

    if (!profile?.user) {

      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );

    }

    // Create lead
    const lead =
      await prisma.lead.create({

        data: {

          name,
          email,
          phone,
          company,

          userId:
            profile.user.id,

        },

      });

    console.log(
      "LEAD CREATED:",
      lead
    );

    // Update analytics safely
    await prisma.analytics.updateMany({

      where: {
        userId:
          profile.user.id,
      },

      data: {

        leads: {
          increment: 1,
        },

      },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(
      "FULL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );

  }
}