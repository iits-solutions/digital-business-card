import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Coupon ID is required.",
      });
    }

    await prisma.coupon.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Failed to delete coupon.",
    });
  }
}