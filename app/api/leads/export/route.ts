import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

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

    // Find current user
    const user =
      await prisma.user.findUnique({

        where: {
          email: session.user.email,
        },

        include: {
          leads: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },

      });

    const leads =
      user?.leads || [];

    // CSV Headers
    const headers = [

      "Name",
      "Email",
      "Phone",
      "Company",
      "Created At",

    ];

    // CSV Rows
    const rows =
      leads.map((lead) => [

        lead.name || "",
        lead.email || "",
        lead.phone || "",
        lead.company || "",
        new Date(
          lead.createdAt
        ).toLocaleDateString(),

      ]);

    // Combine CSV
    const csv = [

      headers.join(","),

      ...rows.map((row) =>
        row.join(",")
      ),

    ].join("\n");

    return new Response(csv, {

      headers: {

        "Content-Type":
          "text/csv",

        "Content-Disposition":
          'attachment; filename="leads.csv"',

      },

    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );

  }
}