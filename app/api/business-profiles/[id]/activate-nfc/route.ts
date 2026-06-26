import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        nfcCards: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.nfcCards.length === 0) {
      return NextResponse.json(
        { error: "No NFC card assigned." },
        { status: 404 }
      );
    }

    await prisma.nfcCard.update({
      where: {
        id: user.nfcCards[0].id,
      },
      data: {
        activeBusinessProfileId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Business profile activated on NFC card.",
    });

  } catch (error) {
    console.error(error);

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