import crypto from "crypto";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const rawBody =
      await req.text();

    const signature =
      req.headers.get(
        "x-signature"
      );

    const secret =
      process.env
        .LEMON_SQUEEZY_WEBHOOK_SECRET!;

    const digest =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(rawBody)
        .digest("hex");

    if (
      digest !== signature
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid signature",
        },
        {
          status: 401,
        }
      );

    }

    const body =
      JSON.parse(rawBody);

    console.log(
      "Webhook Event:",
      body.meta.event_name
    );

    if (

      body.meta.event_name ===
        "subscription_created"

      ||

      body.meta.event_name ===
        "subscription_payment_success"

    ) {

      const customData =
        body.meta.custom_data;

      const plan =
        customData.plan;

      const billing =
        customData.billing;

      const customerEmail =
        body.data.attributes
          .user_email;

      console.log(
        "CUSTOMER EMAIL:",
        customerEmail
      );

      const expiresAt =
        new Date();

      if (
        billing === "YEARLY"
      ) {

        expiresAt.setMonth(
          expiresAt.getMonth() + 12
        );

      } else {

        expiresAt.setMonth(
          expiresAt.getMonth() + 1
        );

      }

      const customerId =
  body.data.attributes
    .customer_id
    ?.toString() || "";

const subscriptionId =
  body.data.attributes
    .subscription_id
    ?.toString() || "";

const orderId =
  body.data.attributes
    .order_id
    ?.toString() || "";

      const updatedCard =
        await prisma.nfcCard.updateMany({

          where: {

            user: {

              email:
                customerEmail,

            },

          },

          data: {

            status:
              "ACTIVE",

            plan,

            expiresAt,

            lemonCustomerId:
              customerId,

            lemonSubscriptionId:
              subscriptionId,

            lemonOrderId:
              orderId,

          },

        });

      console.log(
        "UPDATED CARDS:",
        updatedCard
      );

      console.log(
        "Subscription Activated"
      );

    }

    if (
      body.meta.event_name ===
      "subscription_cancelled"
    ) {

      const customerEmail =
        body.data.attributes
          .user_email;

      const updatedCard =
        await prisma.nfcCard.updateMany({

          where: {

            user: {

              email:
                customerEmail,

            },

          },

          data: {

            status:
              "EXPIRED",

          },

        });

      console.log(
        "CANCELLED CARDS:",
        updatedCard
      );

      console.log(
        "Subscription Cancelled"
      );

    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Webhook failed",
      },
      {
        status: 500,
      }
    );

  }

}