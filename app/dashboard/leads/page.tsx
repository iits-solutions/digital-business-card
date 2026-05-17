import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function LeadsPage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {

    redirect("/login");

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

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-5xl font-bold mb-4">

              Lead Management

            </h1>

            <p className="text-gray-400 text-lg">

              Manage and track your captured business leads.

            </p>

          </div>

          {/* Export Button */}
          <div>

            <a
              href="/api/leads/export"
              className="inline-block bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-2xl font-semibold"
            >

              Export CSV

            </a>

          </div>

        </div>

        {/* Leads Count */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 mb-8">

          <h2 className="text-2xl font-bold">

            Total Leads:{" "}

            <span className="text-blue-400">

              {user?.leads.length || 0}

            </span>

          </h2>

        </div>

        {/* Leads Table */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-black/40">

                <tr>

                  <th className="text-left p-5">

                    Name

                  </th>

                  <th className="text-left p-5">

                    Email

                  </th>

                  <th className="text-left p-5">

                    Phone

                  </th>

                  <th className="text-left p-5">

                    Company

                  </th>

                  <th className="text-left p-5">

                    Date

                  </th>

                </tr>

              </thead>

              <tbody>

                {user?.leads.length ? (

                  user.leads.map((lead) => (

                    <tr
                      key={lead.id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >

                      <td className="p-5">

                        {lead.name}

                      </td>

                      <td className="p-5">

                        {lead.email || "-"}

                      </td>

                      <td className="p-5">

                        {lead.phone || "-"}

                      </td>

                      <td className="p-5">

                        {lead.company || "-"}

                      </td>

                      <td className="p-5 text-gray-400">

                        {new Date(
                          lead.createdAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="p-10 text-center text-gray-400"
                    >

                      No leads captured yet.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}