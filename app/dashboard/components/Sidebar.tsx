"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {

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

    <aside className="w-64 min-h-screen bg-[#081028] border-r border-white/10 px-5 py-6 flex flex-col">

      {/* Logo */}
      <div className="mb-8 text-center">

  <img
    src="/iLinq-Logo.png"
    alt="iLinq.Team"
    className="w-28 mx-auto mb-3"
  />

  <p className="text-xs text-gray-400 tracking-wide">
    Professional Digital Networking
  </p>

</div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3">

        {links.map((link) => (

          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
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
  onClick={() => {
    onNavigate?.();
    signOut({
      callbackUrl: "/login",
    });
  }}
  className="w-full bg-red-600 hover:bg-red-700 px-5 py-4 rounded-2xl font-medium transition"
>
  Logout
</button>

      </div>

    </aside>
  );
}