"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

export default function Sidebar() {

  const pathname = usePathname();

  const links = [

    {
      name: "Dashboard",
      href: "/dashboard",
    },

    {
      name: "Profile",
      href: "/dashboard/profile",
    },

    {
      name: "QR Code",
      href: "/dashboard/qr",
    },

  ];

  return (

    <aside className="w-72 min-h-screen bg-[#0B132B] border-r border-white/10 p-6">

      {/* Logo */}
      <div className="mb-12">

        <h1 className="text-3xl font-bold text-white">
          ILinq
        </h1>

        <p className="text-gray-400 mt-2">
          Digital Networking
        </p>

      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3">

        {links.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            className={`px-5 py-4 rounded-2xl transition font-medium ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            {link.name}
          </Link>

        ))}

      </nav>

      {/* Logout */}
      <div className="mt-12">

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="w-full bg-red-600 hover:bg-red-700 px-5 py-4 rounded-2xl font-medium transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}