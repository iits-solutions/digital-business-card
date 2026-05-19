import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await params;

    await prisma.lead.delete({

      where: {
        id,
      },

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete lead",
      },
      { status: 500 }
    );

  }

}