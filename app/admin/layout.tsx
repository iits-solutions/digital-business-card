"use client";

import { signOut } from "next-auth/react";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

const [sidebarOpen, setSidebarOpen] =
  useState(false);

  const menuItems = [

    {
      name: "Dashboard",
      href: "/admin",
    },

    {
      name: "Users",
      href: "/admin/users",
    },

    {
      name: "Companies",
      href: "/admin/companies",
    },

    {
      name: "Coupons",
      href: "/admin/coupons",
    },

    {
      name: "Subscriptions",
      href: "/admin/subscriptions",
    },

    {
      name: "Revenue",
      href: "/admin/revenue",
    },

    {
      name: "Analytics",
      href: "/admin/analytics",
    },

    {
      name: "Settings",
      href: "/admin/settings",
    },

    {
      name: "NFC Cards",
      href: "/admin/nfc",
    }

  ];

  return (

    <div className="min-h-screen flex bg-black text-white">

      {/* Sidebar */}

      {/* Mobile Overlay */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/60 z-40 md:hidden"
    onClick={() =>
      setSidebarOpen(false)
    }
  />
)}

      <aside
  className={`
    fixed md:static
    top-0 left-0
    h-screen
    w-72
    bg-[#081028]
    border-r border-white/10
    p-6
    z-50
    transform transition-transform duration-300
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>

        <div className="mb-10">

          <h1 className="text-3xl font-bold">

            iLinq Admin

          </h1>

          <p className="text-gray-400 mt-2">

            Enterprise Control Panel

          </p>

        </div>

        <nav className="space-y-3">

  {menuItems.map((item) => {

    const isActive =
      pathname === item.href;

    return (

      <Link
  key={item.href}
  href={item.href}
  onClick={() =>
    setSidebarOpen(false)
  }
  className={`block px-5 py-4 rounded-2xl transition font-semibold ${
    isActive
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-[#0b1736] hover:bg-[#13224d]"
  }`}
>

        {item.name}

      </Link>

    );

  })}

  {/* Divider */}
  <div className="border-t border-white/10 my-6" />

  {/* Back to User Dashboard */}
  <Link
    href="/dashboard"
    className="block px-5 py-4 rounded-2xl bg-[#0b1736] hover:bg-[#13224d] transition font-semibold"
  >
    ← User Dashboard
    
    <button
  onClick={() =>
    signOut({
      callbackUrl: "/login",
    })
  }
  className="w-full mt-3 px-5 py-4 rounded-2xl bg-red-600 hover:bg-red-700 transition font-semibold text-left"
>
  Logout

</button>
  </Link>

</nav>

      </aside>

     {/* Main */}
<main className="flex-1 p-4 md:p-10">

  {/* Mobile Header */}
  <div className="flex items-center justify-between md:hidden mb-6">

    <button
      onClick={() =>
        setSidebarOpen(!sidebarOpen)
      }
      className="text-3xl"
    >
      ☰
    </button>

    <h2 className="text-xl font-bold">
      iLinq Admin
    </h2>

    <div className="w-8" />

  </div>

        {children}

      </main>

    </div>

  );

}