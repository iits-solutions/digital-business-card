import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      businessProfileId,
      name,
      company,
      email,
      phone,
      message,
    } = await req.json();

    const profile = await prisma.businessProfile.findUnique({
      where: {
        id: businessProfileId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        userId: profile.userId,
        businessProfileId: profile.id,

        name,
        company,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}