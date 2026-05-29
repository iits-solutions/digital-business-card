"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

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

  ];

  return (

    <div className="min-h-screen flex bg-black text-white">

      {/* Sidebar */}
      <aside className="w-72 bg-[#081028] border-r border-white/10 p-6">

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

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {children}

      </main>

    </div>

  );

}