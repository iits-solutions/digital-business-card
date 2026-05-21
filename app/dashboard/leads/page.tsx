import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import LeadsTable from "@/app/components/LeadsTable";

export default async function LeadsPage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {

    redirect("/login");

  }

  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },

      include: {

        leads: {

          orderBy: {
            createdAt:
              "desc",
          },

        },

      },

    });

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">

            Leads Management

          </h1>

          <p className="text-gray-400 text-lg">

            Manage and track all captured leads.

          </p>

        </div>

        {/* Leads Table */}
        <LeadsTable
          leads={
            user?.leads || []
          }
        />

      </div>

    </main>
  );
}