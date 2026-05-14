import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      email,
      password,
      fullName,
      username,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,

        profile: {
         create: {
             fullName,
             username,
           },
         },

        analytics: {
        create: {
         profileViews: 0,
         qrScans: 0,
         nfcTaps: 0,
         leads: 0,
        },
       },
      },

      include: {
        profile: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}