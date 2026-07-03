"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  User,
  Briefcase,
  QrCode,
  Users,
  LogOut,
  Shield,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const [profile, setProfile] = useState({

    fullName: "",
    username: "",
    image: "",
    role: "USER",

  });

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response =
          await fetch("/api/profile");

        const data =
          await response.json();

        setProfile({

  fullName:
    data.fullName || "",

  username:
    data.username || "",

  image:
    data.image || "",

  role:
    data.role || "USER",

});

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Business Profiles",
    href: "/dashboard/business-profiles",
    icon: Briefcase,
  },
  {
    name: "QR & NFC",
    href: "/dashboard/qr",
    icon: QrCode,
  },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
];

  return (

    <aside className="w-[290px] md:w-80 h-screen bg-[#081028] border-r border-white/10 px-6 py-8 flex flex-col justify-between shadow-2xl overflow-y-auto">

      <div>

        {/* User */}
        <div className="mb-10">

          <div className="w-20 h-20 rounded-3xl overflow-hidden bg-[#111827] border border-white/10 mb-4">

            {profile.image ? (

              <img
                src={profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center text-gray-500">

                No Image

              </div>

            )}

          </div>

          <h2 className="text-white text-lg font-bold">

            {profile.fullName || "User"}

          </h2>

          <p className="text-gray-500 text-sm mt-1">

            @{profile.username || "username"}

          </p>

        </div>

        {/* Navigation */}
        <nav className="space-y-3">

          {navItems.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:translate-x-1"
              }`}
            >

              <div className="flex items-center gap-3">
  <item.icon size={20} />
  <span>{item.name}</span>
</div>

            </Link>

          ))}
{profile.role ===
  "SUPER_ADMIN" && (

  <>
    <div className="border-t border-white/10 my-6" />

    <Link
      href="/admin"
      className="block px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
    >
      Super Admin
    </Link>
  </>

)}

        </nav>

      </div>

      {/* Logout */}
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

    </aside>
  );
}