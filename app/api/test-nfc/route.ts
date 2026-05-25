import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { createNfcCard } from "@/lib/createNfcCard";

export async function GET() {

  // Replace with your actual user ID
  const userId = "cmp07m3mx0000x72o99fs50w0";

  try {

    const card = await createNfcCard(userId);

    return NextResponse.json({
      success: true,
      card,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Failed to create NFC card",
    });

  }

}