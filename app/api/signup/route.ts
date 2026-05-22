import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {

      email,
      password,
      fullName,
      username,

    } = body;

    // Check duplicate email
const existingEmail =
  await prisma.user.findUnique({

    where: {
      email,
    },

  });

if (existingEmail) {

  return NextResponse.json(
    {

      success: false,

      error:
        "Email already exists",

    },
    {

      status: 400,

    }
  );

}

// Check duplicate username
const existingUsername =
  await prisma.profile.findUnique({

    where: {
      username,
    },

  });

if (existingUsername) {

  return NextResponse.json(
    {

      success: false,

      error:
        "Username already exists",

    },
    {

      status: 400,

    }
  );

}

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Create user
    const user =
      await prisma.user.create({

        data: {

          email,

          password:
            hashedPassword,

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

    console.log(
      "SIGNUP ERROR:",
      error
    );

    return NextResponse.json(
      {

        success: false,

        error: String(error),

      },
      {

        status: 500,

      }
    );

  }

}