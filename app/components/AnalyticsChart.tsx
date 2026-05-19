"use client";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,

} from "recharts";

export default function AnalyticsChart({
  data,
}: {
  data: {
    name: string;
    leads: number;
  }[];
}) {

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">

        Leads Growth

      </h2>

      <div className="w-full h-[350px] min-h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

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
              domain={[0, "dataMax + 1"]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor:
                  "#0F172A",
                border:
                  "1px solid #1E293B",
                borderRadius:
                  "12px",
                color: "white",
              }}
            />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#3B82F6"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 7,
              }}
              connectNulls
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}