import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import StatsCard from "@/app/components/StatsCard";

import AnalyticsChart from "@/app/components/AnalyticsChart";

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
        analytics: true,
        leads: true,
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

  // Convert to chart format
  const chartData =
    days.map((day) => ({

      name: day,

      leads:
        leadsPerDay[day] > 0
          ? leadsPerDay[day]
          : 0.1,

    }));

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">

            Analytics Dashboard

          </h1>

          <p className="text-gray-400 text-lg">

            Monitor your networking
            performance and lead generation.

          </p>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

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
            title="Total Leads"
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

      </div>

    </main>
  );
}