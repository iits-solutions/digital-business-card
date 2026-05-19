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

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 mt-8">

      <h2 className="text-3xl font-bold mb-2">

        Leads Growth

      </h2>

      <p className="text-gray-400 mb-8">

        Weekly lead analytics

      </p>

      <div className="w-full h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
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
                backgroundColor:
                  "#0F172A",
                border:
                  "1px solid #1E293B",
                borderRadius:
                  "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#3B82F6"
              strokeWidth={4}
              dot={{
                r: 6,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}