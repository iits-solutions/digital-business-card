"use client";

import Link from "next/link";

import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  createdAt: Date;
}

export default function LeadsTable({
  leads,
}: {
  leads: Lead[];
}) {

  const [search, setSearch] =
    useState("");

  const filteredLeads =
    leads.filter((lead) =>
      lead.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <h2 className="text-3xl font-bold">
          Captured Leads
        </h2>

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-black border border-white/10 rounded-2xl px-5 py-3 outline-none w-full md:w-80"
        />

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full min-w-[1000px] border-separate border-spacing-y-2">

          <thead>

            <tr className="text-left border-b border-white/10 text-gray-400">

              <th className="pb-4">
                Name
              </th>

              <th className="pb-4">
                Email
              </th>

              <th className="pb-4">
                Phone
              </th>

              <th className="pb-4">
                Company
              </th>

              <th className="pb-4">
                Date
              </th>

              <th className="pb-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.map(
              (lead) => (

                <tr
                  key={lead.id}
                  className="bg-black/20"
                >

                  <td className="py-5 text-gray-300">
                    {lead.name}
                  </td>

                  <td className="py-5">
                    {lead.email || "-"}
                  </td>

                  <td className="py-5">
                    {lead.phone || "-"}
                  </td>

                  <td className="py-5">
                    {lead.company || "-"}
                  </td>

                  <td className="py-5 text-gray-400">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="py-5">

                    <div className="flex gap-3">

                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                      >
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white transition">
                          View
                        </button>
                      </Link>

                      <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition">
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">

        {filteredLeads.map(
          (lead) => (

            <div
              key={lead.id}
              className="bg-black/30 border border-white/10 rounded-2xl p-5"
            >

              <h3 className="text-xl font-bold mb-2">
                {lead.name}
              </h3>

              <div className="space-y-2 text-gray-300 text-sm">

                <p>
                  📧 {lead.email || "-"}
                </p>

                <p>
                  📱 {lead.phone || "-"}
                </p>

                <p>
                  🏢 {lead.company || "-"}
                </p>

                <p className="text-gray-500">
                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="flex gap-3 mt-5">

                <Link
                  href={`/dashboard/leads/${lead.id}`}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white transition">
                    View
                  </button>
                </Link>

                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white transition">
                  Delete
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}