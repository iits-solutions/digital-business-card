import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    id: string;
  };
}

export default async function LeadDetailsPage({
  params,
}: Props) {

  const lead =
    await prisma.lead.findUnique({

      where: {
        id: params.id,
      },

    });

  if (!lead) {

    return (

      <div className="min-h-screen bg-black text-white p-10">

        <h1 className="text-4xl font-bold">
          Lead Not Found
        </h1>

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3">

            {lead.name}

          </h1>

          <p className="text-gray-400 text-lg">

            Lead Details & CRM Profile

          </p>

        </div>

        {/* Main Card */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Left Side */}
            <div className="space-y-6">

              <div>

                <p className="text-gray-400 mb-2">
                  Email
                </p>

                <h2 className="text-xl">
                  {lead.email || "-"}
                </h2>

              </div>

              <div>

                <p className="text-gray-400 mb-2">
                  Phone
                </p>

                <h2 className="text-xl">
                  {lead.phone || "-"}
                </h2>

              </div>

              <div>

                <p className="text-gray-400 mb-2">
                  Company
                </p>

                <h2 className="text-xl">
                  {lead.company || "-"}
                </h2>

              </div>

              <div>

                <p className="text-gray-400 mb-2">
                  Created Date
                </p>

                <h2 className="text-xl">
                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}
                </h2>

              </div>

            </div>

            {/* Right Side */}
            <div className="space-y-6">

              <div>

                <p className="text-gray-400 mb-2">
                  Lead Status
                </p>

                <div className="bg-blue-600 inline-block px-4 py-2 rounded-xl">

                  New Lead

                </div>

              </div>

              <div>

                <p className="text-gray-400 mb-2">
                  Quick Actions
                </p>

                <div className="flex flex-wrap gap-3">

                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition">
                    WhatsApp
                  </button>

                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition">
                    Email
                  </button>

                  <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition">
                    Add Note
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Notes Section */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">

            Notes

          </h2>

          <textarea
            placeholder="Add notes about this lead..."
            className="w-full bg-black border border-white/10 rounded-2xl p-5 min-h-[180px] outline-none"
          />

        </div>

        {/* Activity Timeline */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">

            Activity Timeline

          </h2>

          <div className="space-y-4">

            <div className="bg-black/30 border border-white/10 rounded-2xl p-4">

              Lead profile viewed

            </div>

            <div className="bg-black/30 border border-white/10 rounded-2xl p-4">

              Lead created

            </div>

            <div className="bg-black/30 border border-white/10 rounded-2xl p-4">

              QR code scanned

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}