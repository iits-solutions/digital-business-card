import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import StatsCard from "@/app/components/StatsCard";

import AnalyticsChart from "@/app/components/AnalyticsChart";

import ActivityFeed from "@/app/components/ActivityFeed";

export default async function DashboardPage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {

    redirect("/login");

  }

  // Find user with analytics
  const user =
    await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

      include: {

  profile: true,

  analytics: true,

  nfcCards: true,

  leads: {

    orderBy: {
      createdAt: "desc",
    },

    take: 5,

  },

        activities: {

          orderBy: {
            createdAt: "desc",
          },

          take: 10,

        },

      },

    });

  const analytics =
    user?.analytics;

  // REAL Dynamic Chart Data
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const leadsPerDay: Record<
    string,
    number
  > = {

    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,

  };

  // Count leads by weekday
  user?.leads.forEach((lead) => {

    const day =
      days[
        new Date(
          lead.createdAt
        ).getDay()
      ];

    leadsPerDay[day]++;

  });

  // Real Chart Data
  const realChartData =
    days.map((day) => ({

      name: day,

      leads:
        leadsPerDay[day],

    }));

  // Fallback if no real data
  const hasRealData =
    realChartData.some(
      (item) => item.leads > 0
    );

  const chartData =
    hasRealData
      ? realChartData
      : [

          {
            name: "Mon",
            leads: 12,
          },

          {
            name: "Tue",
            leads: 18,
          },

          {
            name: "Wed",
            leads: 24,
          },

          {
            name: "Thu",
            leads: 31,
          },

          {
            name: "Fri",
            leads: 38,
          },

        ];

  return (

    <main className="min-h-screen bg-black text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">

              Dashboard

            </h1>

            <p className="text-gray-400 mt-2">

              Welcome back,
              {" "}
              {user?.profile?.fullName || "User"}

            </p>

            <p className="text-sm text-gray-500 mt-1">

              {session.user.email}

            </p>

          </div>

          <div className="flex flex-wrap items-center gap-4">

<a
  href="/manage-subscription"
  className="bg-purple-600 hover:bg-purple-700 transition px-5 py-3 rounded-2xl font-medium"
>

  Manage Subscription

</a>

            {user?.plan === "FREE" ? (

  <a
    href="/manage-subscription"
    className="bg-gray-600 hover:bg-gray-700 transition px-5 py-3 rounded-2xl font-medium"
  >
    NFC Tools 🔒
  </a>

) : (

  <a
    href="/dashboard/nfc"
    className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium"
  >
    NFC Tools
  </a>

)}

            <form
              action="/api/auth/signout"
              method="POST"
            >

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-medium"
              >

                Logout

              </button>

            </form>

          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6">

            <p className="text-sm text-white/80 mb-2">

              Current Plan

            </p>

            <h2 className="text-3xl font-bold">

              FREE

            </h2>

            <p className="text-sm text-white/70 mt-2">

              Free Plan

            </p>

          </div>

          <StatsCard
            title="Profile Views"
            value={
              analytics?.profileViews || 0
            }
            icon="👀"
          />

          <StatsCard
            title="QR Scans"
            value={
              analytics?.qrScans || 0
            }
            icon="📱"
          />

          <StatsCard
            title="NFC Taps"
            value={
              analytics?.nfcTaps || 0
            }
            icon="📶"
          />

          <StatsCard
            title="Leads"
            value={
              user?.leads.length || 0
            }
            icon="🤝"
          />

        </div>

        {/* Analytics Chart */}
        <AnalyticsChart
          data={chartData}
        />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10 items-start">

          {/* Activity Feed */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              Recent Activity

            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

              <ActivityFeed
                activities={
                  user?.activities || []
                }
              />

            </div>

          </div>

          {/* Recent Leads */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              Recent Leads

            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

              {user?.leads.length ? (

                user.leads.map((lead) => (

                  <div
                    key={lead.id}
                    className="bg-black/30 border border-white/5 rounded-2xl p-4"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="font-semibold">

                          {lead.name}

                        </p>

                        <p className="text-sm text-gray-400">

                          {lead.email || "No Email"}

                        </p>

                        <p className="text-sm text-gray-500 mt-1">

                          {lead.company || "No Company"}

                        </p>

                      </div>

                      <div className="text-sm text-gray-500">

                        {new Date(
                          lead.createdAt
                        ).toLocaleDateString()}

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div className="text-gray-400">

                  No leads yet.

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}