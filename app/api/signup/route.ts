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

// Password validation
if (!password || password.length < 8) {

  return NextResponse.json(
    {
      success: false,
      error:
        "Password must be at least 8 characters long",
    },
    {
      status: 400,
    }
  );

}

// Username validation
if (!username || username.length < 3) {

  return NextResponse.json(
    {
      success: false,
      error:
        "Username must be at least 3 characters long",
    },
    {
      status: 400,
    }
  );

}

const usernameRegex =
  /^[a-z0-9_]+$/;

if (!usernameRegex.test(username)) {

  return NextResponse.json(
    {
      success: false,
      error:
        "Username can only contain lowercase letters, numbers and underscores",
    },
    {
      status: 400,
    }
  );

}

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