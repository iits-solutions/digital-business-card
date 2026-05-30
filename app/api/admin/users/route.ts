import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {

    const users =
      await prisma.user.findMany({
        include: {
          profile: true,
          nfcCards: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      users,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load users",
      },
      {
        status: 500,
      }
    );
  }
}