"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    name: string;
    leads: number;
  }[];
}

export default function AnalyticsChart({
  data,
}: Props) {
  const hasData = data.length > 0;

  const totalLeads = data.reduce(
    (sum, day) => sum + day.leads,
    0
  );

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#081028] via-[#0B1736] to-[#081028] p-5 md:p-8 shadow-2xl">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-3xl md:text-3xl font-bold text-white">
            Leads Growth
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Weekly lead analytics
          </p>
        </div>

        <div className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-xs md:text-sm font-medium text-blue-300">
          This Week
        </div>
      </div>

      {!hasData ? (
        <div className="h-[280px] flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">
            📈
          </div>

          <h3 className="text-3xl font-semibold">
            No analytics yet
          </h3>

          <p className="text-gray-400 mt-2">
            Share your profile to start collecting leads.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full h-[290px] md:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -25,
                  bottom: 0,
                }}
              >
                <defs>
  <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
    <feMerge>
      <feMergeNode in="coloredBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
                <CartesianGrid
                  stroke="#1E293B"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                />

                <YAxis
                  hide={typeof window !== "undefined" && window.innerWidth < 768}
                  allowDecimals={false}
                  domain={[0, "dataMax + 1"]}
                  tickLine={false}
                  axisLine={false}
                  stroke="#94A3B8"
                />

                <Tooltip
                  cursor={false}
                  
                />

                <Line
  type="monotone"
  dataKey="leads"
  stroke="#3B82F6"
  strokeWidth={4}
  filter="url(#lineGlow)"
  dot={{
    r: 6,
    fill: "#fff",
    stroke: "#3B82F6",
    strokeWidth: 3,
  }}
  activeDot={{
    r: 8,
  }}
/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <div>
              <p className="text-sm text-gray-400">
                Total Leads
              </p>

              <p className="text-3xl font-bold text-white">
                {totalLeads}
              </p>
            </div>

            <div className="rounded-2xl bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-400 font-medium">
              Live Analytics
            </div>
          </div>
        </>
      )}
    </div>
  );
}