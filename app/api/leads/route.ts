import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { resend } from "@/lib/resend";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    console.log("BODY:", body);

    const {
      username,
      name,
      email,
      phone,
      company,
    } = body;

    // Find profile by username
    const profile =
      await prisma.profile.findFirst({

        where: {
          username: {
            equals:
              username.toLowerCase(),
            mode: "insensitive",
          },
        },

        include: {
          user: true,
        },

      });

    console.log("PROFILE:", profile);

    if (!profile?.user) {

      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );

    }

    // Create lead
    const lead =
      await prisma.lead.create({

        data: {

          name,
          email,
          phone,
          company,

          userId:
            profile.user.id,

        },

      });

    console.log(
      "LEAD CREATED:",
      lead
    );

    // Send Email Notification
await resend.emails.send({

  from:
    "ILinq <onboarding@resend.dev>",

  to:
    profile.user.email,

  subject:
    "🎉 New Lead Captured",

  html: `

    <div style="font-family:sans-serif;">

      <h2>
        New Lead Captured
      </h2>

      <p>
        Someone submitted your
        contact form.
      </p>

      <hr />

      <p>
        <strong>Name:</strong>
        ${name}
      </p>

      <p>
        <strong>Email:</strong>
        ${email}
      </p>

      <p>
        <strong>Phone:</strong>
        ${phone}
      </p>

      <p>
        <strong>Company:</strong>
        ${company}
      </p>

    </div>

  `,

});

    // Update analytics safely
    await prisma.analytics.updateMany({

      where: {
        userId:
          profile.user.id,
      },

      data: {

        leads: {
          increment: 1,
        },

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
        error: String(error),
      },
      { status: 500 }
    );

  }
}