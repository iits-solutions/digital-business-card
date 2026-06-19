import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test 1: User only
    const user = await prisma.user.findFirst();

    return NextResponse.json({
      success: true,
      step: "User only",
      user,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}