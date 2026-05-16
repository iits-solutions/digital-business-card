"use client";

import { signOut, useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

export default function DashboardPage() {

  const { data: session } =
    useSession();

  const [analytics, setAnalytics] =
    useState({

      profileViews: 0,

      qrScans: 0,

      nfcTaps: 0,

      leads: 0,

      plan: "FREE",

      subscriptionStatus: null,

    });

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const response =
          await fetch("/api/dashboard");

        const data =
          await response.json();

        setAnalytics({

          profileViews:
            data.profileViews || 0,

          qrScans:
            data.qrScans || 0,

          nfcTaps:
            data.nfcTaps || 0,

          leads:
            data.leads || 0,

          plan:
            data.plan || "FREE",

          subscriptionStatus:
            data.subscriptionStatus || null,

        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchAnalytics();

  }, []);

  // Demo chart data
  const chartData = [

    {
      name: "Mon",
      views:
        analytics.profileViews * 0.2,
    },

    {
      name: "Tue",
      views:
        analytics.profileViews * 0.4,
    },

    {
      name: "Wed",
      views:
        analytics.profileViews * 0.6,
    },

    {
      name: "Thu",
      views:
        analytics.profileViews * 0.8,
    },

    {
      name: "Fri",
      views:
        analytics.profileViews,
    },

  ];

  return (

    <main className="min-h-screen bg-black text-white p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">

        <div>

          <h1 className="text-4xl font-bold">

            Dashboard

          </h1>

          <p className="text-gray-400 mt-2">

            Welcome back,{" "}
            {session?.user?.name}

          </p>

          <p className="text-sm text-gray-500 mt-1">

            {session?.user?.email}

          </p>

        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl font-semibold transition"
        >

          Logout

        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

        {/* Current Plan */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-6 min-h-[190px]">

          <h2 className="text-white/80 text-lg mb-4">

            Current Plan

          </h2>

          <p className="text-3xl font-bold">

            {analytics.plan}

          </p>

          <p className="text-sm text-white/70 mt-2">

            {analytics.subscriptionStatus || "Free Plan"}

          </p>

        </div>

        {/* Profile Views */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 min-h-[190px]">

          <h2 className="text-gray-400 text-lg mb-4">

            Profile Views

          </h2>

          <p className="text-3xl font-bold">

            {analytics.profileViews}

          </p>

        </div>

        {/* QR Scans */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 min-h-[190px]">

          <h2 className="text-gray-400 text-lg mb-4">

            QR Scans

          </h2>

          <p className="text-3xl font-bold">

            {analytics.qrScans}

          </p>

        </div>

        {/* NFC Taps */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 min-h-[190px]">

          <h2 className="text-gray-400 text-lg mb-4">

            NFC Taps

          </h2>

          <p className="text-3xl font-bold">

            {analytics.nfcTaps}

          </p>

        </div>

        {/* Leads */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 min-h-[190px]">

          <h2 className="text-gray-400 text-lg mb-4">

            Leads

          </h2>

          <p className="text-3xl font-bold">

            {analytics.leads}

          </p>

        </div>

      </div>

      {/* Analytics Chart */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">

            Engagement Analytics

          </h2>

          <p className="text-gray-400 mt-2">

            Profile growth overview

          </p>

        </div>

        <div className="w-full h-[400px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chartData}
            >

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Upgrade Plans */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">

          Upgrade Your Plan

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Starter */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-2">

              Starter

            </h3>

            <p className="text-gray-400 mb-6">

              NFC + WhatsApp features

            </p>

            <p className="text-4xl font-bold mb-6">

              $1

              <span className="text-lg text-gray-400">

                /month

              </span>

            </p>

            <a
              href="https://ilinq-team.lemonsqueezy.com/checkout/buy/bc2e5649-359d-4a9d-8d9a-62d26a29986d"
              target="_blank"
              className="block w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-2xl text-center"
            >

              Upgrade

            </a>

          </div>

          {/* Pro */}
          <div className="bg-white text-black rounded-3xl p-6 shadow-2xl">

            <div className="inline-block bg-black text-white text-sm px-4 py-2 rounded-full mb-4">

              Popular

            </div>

            <h3 className="text-2xl font-bold mb-2">

              Pro

            </h3>

            <p className="text-gray-600 mb-6">

              Premium analytics & branding

            </p>

            <p className="text-4xl font-bold mb-6">

              $2

              <span className="text-lg text-gray-500">

                /month

              </span>

            </p>

            <a
              href="https://ilinq-team.lemonsqueezy.com/checkout/buy/d0be8c7b-7c10-4ce0-aa3e-c1ed589bb579"
              target="_blank"
              className="block w-full bg-black text-white hover:bg-gray-800 transition py-3 rounded-2xl text-center"
            >

              Upgrade

            </a>

          </div>

          {/* Premium */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-2">

              Premium

            </h3>

            <p className="text-gray-400 mb-6">

              Advanced NFC business tools

            </p>

            <p className="text-4xl font-bold mb-6">

              $5

              <span className="text-lg text-gray-400">

                /month

              </span>

            </p>

            <a
              href="https://ilinq-team.lemonsqueezy.com/checkout/buy/01825d5e-a7d5-4d35-84aa-4d8b4aa4b6da"
              target="_blank"
              className="block w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-2xl text-center"
            >

              Upgrade

            </a>

          </div>

        </div>

      </div>

    </main>
  );
}