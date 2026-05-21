"use client";

import { useMemo, useState } from "react";

interface Lead {

  id: string;

  name: string;

  email: string | null;

  phone: string | null;

  company: string | null;

  status: string;

  createdAt: Date;

}

export default function LeadsTable({
  leads,
}: {
  leads: Lead[];
}) {

  const [search, setSearch] =
    useState("");

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  // Filter Leads
  const filteredLeads =
    useMemo(() => {

      return leads.filter((lead) => {

        const query =
          search.toLowerCase();

        return (

          lead.name
            ?.toLowerCase()
            .includes(query) ||

          lead.email
            ?.toLowerCase()
            .includes(query) ||

          lead.company
            ?.toLowerCase()
            .includes(query)

        );

      });

    }, [search, leads]);

  // Delete Lead
  const deleteLead = async (
    id: string
  ) => {

    try {

      setLoadingId(id);

      const response =
        await fetch(`/api/leads/${id}`, {

          method: "DELETE",

        });

      if (response.ok) {

        window.location.reload();

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingId(null);

    }
  };

  return (

    <div>

      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-[#081028] border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* Table */}
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

                <th className="pb-4">

                  Status

                </th>

                <th className="text-left p-5">

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.length ? (

                filteredLeads.map((lead) => (

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

                    <td className="py-5 px-4">

                      <select
                       defaultValue={lead.status}
                       className="bg-black border border-white/10 rounded-xl px-3 py-2 outline-none"
                      >

                      <option value="New">

                        New

                      </option>

                      <option value="Contacted">

                        Contacted

                      </option>

                      <option value="Completed">

                         Completed

                      </option>

                    </select>

                  </td>

                    <td className="p-5">

                      <button
                        onClick={() =>
                          deleteLead(lead.id)
                        }
                        disabled={
                          loadingId === lead.id
                        }
                        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl"
                      >

                        {loadingId === lead.id
                          ? "Deleting..."
                          : "Delete"}

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-400"
                  >

                    No matching leads found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}