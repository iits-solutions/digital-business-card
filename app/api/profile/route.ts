import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

// GET PROFILE
export async function GET() {

  try {

    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const user =
      await prisma.user.findUnique({

        where: {
          email: session.user.email,
        },

        include: {
          profile: true,
        },

      });

    if (!user || !user.profile) {

      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );

    }

    return NextResponse.json({

      fullName:
        user.profile.fullName || "",

      username:
        user.profile.username || "",

      bio:
        user.profile.bio || "",

      image:
        user.profile.image || "",

      company:
        user.profile.company || "",

      jobTitle:
        user.profile.jobTitle || "",

      email:
        user.email || "",

      linkedin:
        user.profile.linkedin || "",

      github:
        user.profile.github || "",

      twitter:
        user.profile.twitter || "",

      instagram:
        user.profile.instagram || "",

      youtube:
        user.profile.youtube || "",

      whatsapp:
        user.profile.whatsapp || "",

      });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}

// UPDATE PROFILE
export async function PUT(
  request: Request
) {

  try {

    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );

    }

    const body =
      await request.json();

    const {

      fullName,
      username,
      bio,
      image,
      company,
      jobTitle,
      linkedin,
      github,
      twitter,
      instagram,
      youtube,
      whatsapp,

    } = body;

    const user =
      await prisma.user.findUnique({

        where: {
          email: session.user.email,
        },

        include: {
          profile: true,
        },

      });

    if (!user?.profile) {

      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );

    }

    await prisma.profile.update({

      where: {
        id: user.profile.id,
      },

      data: {

        fullName,

        username,

        bio,

        image,

        company,

        jobTitle,

        linkedin,

        github,

        twitter,

        instagram,

        youtube,

        whatsapp,

      },

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );

  }
}