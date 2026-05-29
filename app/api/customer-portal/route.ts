import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      customerId,
    } = body;

    const response =
      await fetch(
        "https://api.lemonsqueezy.com/v1/customers/" +
          customerId,
        {

          method: "GET",

          headers: {

            Accept:
              "application/vnd.api+json",

            Authorization:
              `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,

          },

        }
      );

    const data =
      await response.json();

    const portalUrl =
      data.data.attributes
        .urls.customer_portal;

    return NextResponse.json({

      url: portalUrl,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        error:
          "Failed to load portal",

      },
      {

        status: 500,

      }
    );

  }

}