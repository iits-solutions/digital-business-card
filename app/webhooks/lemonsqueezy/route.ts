import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {

  try {

    const body =
      await request.json();

    console.log("Webhook Received:", body);

    const eventName =
      body.meta?.event_name;

    // Subscription Created
    if (
      eventName ===
      "subscription_created"
    ) {

      const email =
        body.data?.attributes?.user_email;

      const productName =
        body.data?.attributes?.product_name;

      if (!email) {

        return NextResponse.json({
          success: false,
        });

      }

      let plan = "FREE";

      // Detect Plan
      if (
        productName?.toLowerCase()
          .includes("starter")
      ) {

        plan = "STARTER";

      } else if (
        productName?.toLowerCase()
          .includes("pro")
      ) {

        plan = "PRO";

      } else if (
        productName?.toLowerCase()
          .includes("premium")
      ) {

        plan = "PREMIUM";

      }

      // Update User
      await prisma.user.update({

        where: {
          email,
        },

        data: {

          plan,

          subscriptionStatus:
            "ACTIVE",

        },

      });

    }

    // Subscription Cancelled
    if (
      eventName ===
      "subscription_cancelled"
    ) {

      const email =
        body.data?.attributes?.user_email;

      if (email) {

        await prisma.user.update({

          where: {
            email,
          },

          data: {

            plan: "FREE",

            subscriptionStatus:
              "CANCELLED",

          },

        });

      }

    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );

  }

}