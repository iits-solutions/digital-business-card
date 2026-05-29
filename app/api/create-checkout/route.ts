import { NextResponse } from "next/server";

const variantMap = {

  STARTER: {

    MONTHLY: "1707013",

    YEARLY: "1715432",

  },

  PRO: {

    MONTHLY: "1707106",

    YEARLY: "1715469",

  },

  PREMIUM: {

    MONTHLY: "1707123",

    YEARLY: "1715475",

  },

};

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      plan,
      billing,
    } = body;

    const variantId =
      variantMap[
        plan as keyof typeof variantMap
      ]?.[
        billing as
          "MONTHLY"
          | "YEARLY"
      ];

    if (!variantId) {

      return NextResponse.json(
        {
          error:
            "Invalid plan or billing",
        },
        {
          status: 400,
        }
      );

    }

    const response =
      await fetch(
        "https://api.lemonsqueezy.com/v1/checkouts",
        {

          method: "POST",

          headers: {

            Accept:
              "application/vnd.api+json",

            "Content-Type":
              "application/vnd.api+json",

            Authorization:
              `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,

          },

          body: JSON.stringify({

            data: {

              type: "checkouts",

              attributes: {

                checkout_data: {

                  custom: {

                    plan,

                    billing,

                  },

                },

              },

              relationships: {

                store: {

                  data: {

                    type: "stores",

                    id:
                      process.env
                        .LEMON_SQUEEZY_STORE_ID,

                  },

                },

                variant: {

                  data: {

                    type: "variants",

                    id:
                      variantId,

                  },

                },

              },

            },

          }),

        }
      );

    const data =
      await response.json();

    return NextResponse.json({

      url:
        data.data.attributes.url,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        error:
          "Checkout creation failed",

      },
      {

        status: 500,

      }
    );

  }

}