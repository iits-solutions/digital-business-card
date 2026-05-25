import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      token: string;
    }>;
  }
) {

  const { token } =
    await context.params;

  try {

    const card =
      await prisma.nfcCard.findUnique({

        where: {
          token,
        },

        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },

      });

    if (!card) {

      return NextResponse.json(
        {
          error: "Card not found",
        },
        {
          status: 404,
        }
      );

    }

    if (
      card.status !== "ACTIVE"
    ) {

      return NextResponse.json(
        {
          error: "Card inactive",
        },
        {
          status: 403,
        }
      );

    }

    return NextResponse.json({
      username:
        card.user.profile?.username,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );

  }

}