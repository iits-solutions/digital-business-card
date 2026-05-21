import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// UPDATE STATUS
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    const body =
      await request.json();

    const { status } =
      body;

    await prisma.lead.update({

      where: { id },

      data: { status },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

      },
      { status: 500 }
    );

  }

}

// DELETE LEAD
export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    await prisma.lead.delete({

      where: { id },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {

        success: false,

      },
      { status: 500 }
    );

  }

}