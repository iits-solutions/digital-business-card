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

  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 mt-8">
      <h2 className="text-3xl font-bold mb-2">
        Leads Growth
      </h2>

      <p className="text-gray-400 mb-8">
        Weekly lead analytics
      </p>

      {!hasData ? (
        <div className="h-[320px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-2xl font-semibold mb-2">
              No activity yet
            </h3>

            <p className="text-gray-400">
              Start sharing your profile to see analytics.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[320px]">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1E293B"
              />

              <XAxis
                dataKey="name"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #1E293B",
                  borderRadius: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="leads"
                stroke="#3B82F6"
                strokeWidth={4}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}