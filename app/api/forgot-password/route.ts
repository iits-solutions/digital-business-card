import { resend } from "@/lib/resend";

import { NextResponse } from "next/server";

import crypto from "crypto";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const { email } =
      body;

    // Find user
    const user =
      await prisma.user.findUnique({

        where: {
          email,
        },

      });

    // Security:
    // Never reveal if email exists
    if (!user) {

      return NextResponse.json({

        success: true,

        message:
          "If an account exists, a reset link has been sent.",

      });

    }

    // Generate token
    const resetToken =
      crypto.randomBytes(32)
        .toString("hex");

    // Expiry (30 mins)
    const resetTokenExpiry =
      new Date(
        Date.now() +
        1000 * 60 * 30
      );

    // Save token
    await prisma.user.update({

      where: {
        email,
      },

      data: {

        resetToken,

        resetTokenExpiry,

      },

    });

    // Reset URL
    const resetUrl =
      `https://ilinq.team/reset-password?token=${resetToken}`;

    // Send reset email
    await resend.emails.send({

      from: "iLinq Team <noreply@ilinq.team>",
      to: email,
      subject: "Reset Your Password",
      html: `

        <div style="font-family:sans-serif;">

          <h2>
            Reset Your Password
          </h2>

          <p>
            Click the button below to reset your password:
          </p>

          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              background:#2563eb;
              color:white;
              padding:12px 20px;
              border-radius:10px;
              text-decoration:none;
            "
          >

            Reset Password

          </a>

          <p>
            This link expires in 30 minutes.
          </p>

        </div>

      `,

    });

    return NextResponse.json({

      success: true,

      message:
        "If an account exists, a reset link has been sent.",

    });

  } catch (error) {

    console.log(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {

        success: false,

        error:
          String(error),

      },
      {

        status: 500,

      }
    );

  }

}