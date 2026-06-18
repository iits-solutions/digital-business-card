import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    console.log("BODY:", body);

    const {
  username,
  businessProfileId,
  name,
  email,
  phone,
  company,
} = body;

    // Find profile by username
   let userId: string;

if (businessProfileId) {

  const businessProfile =
    await prisma.businessProfile.findUnique({

      where: {
        id: businessProfileId,
      },

    });

  if (!businessProfile) {

    return NextResponse.json(
      {
        success: false,
        error: "Business Profile not found",
      },
      { status: 404 }
    );

  }

  userId = businessProfile.userId;

} else {

  // Old system (FREE profile)

  const profile =
    await prisma.profile.findFirst({

      where: {

        username: {
          equals: username.toLowerCase(),
          mode: "insensitive",
        },

      },

      include: {
        user: true,
      },

    });

  if (!profile?.user) {

    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      { status: 404 }
    );

  }

  userId = profile.user.id;

}

      // Create lead  //
const lead =
  await prisma.lead.create({

    data: {

      name,
      email,
      phone,
      company,
      userId,
      businessProfileId,
    },

  });

    console.log(
      "LEAD CREATED:",
      lead
    );

    // Update analytics
    await prisma.analytics.updateMany({

      where: {
  userId,
},

      data: {

        leads: {
          increment: 1,
        },

      },

    });

    // Create activity log
    await prisma.activity.create({

      data: {

        type: "NEW_LEAD",

        message:
          `${name} submitted lead form`,

        userId,
      },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(
      "FULL ERROR:",
      error
    );

    return NextResponse.json(
      {

        success: false,

        error:
          String(error),

      },
      { status: 500 }
    );

  }

}