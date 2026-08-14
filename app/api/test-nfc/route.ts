import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { createNfcCard } from "@/lib/createNfcCard";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = (session.user as any).id;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID not found in session",
        },
        {
          status: 401,
        }
      );
    }

    const card = await createNfcCard(userId);

    return NextResponse.json({
      success: true,
      card,
    });

  } catch (error) {
    console.error("NFC card creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create NFC card",
      },
      {
        status: 500,
      }
    );
  }
}