import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      code,
      type,
      value,
      usageLimit,
      expiresAt,
      allowedPlans,
      purpose,
      duration,
      description,
    } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Coupon ID is required.",
      });
    }

    await prisma.coupon.update({
      where: {
        id,
      },
      data: {
        code,
        type,
        value: Number(value),
        usageLimit: usageLimit ? Number(usageLimit) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        allowedPlans,
        purpose,
        duration,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Coupon updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      error: "Failed to update coupon.",
    });
  }
}