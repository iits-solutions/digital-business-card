"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import { useEffect, useState } from "react";

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
    },

    {
      name: "View Profile",
      href:
        "/dashboard/view-profile",
    },

    {
  name: "Edit Profile",
  href: "/dashboard/profile",
},

{
  name: "Professional Profiles",
  href: "/dashboard/business-profiles",
},

{
  name: "QR Code",
  href: "/dashboard/qr",
},

    {
      name: "Leads Management",
      href:
        "/dashboard/leads",
    },

  ];

  return (

    <aside className="w-72 min-h-screen bg-[#081028] border-r border-white/10 p-6 flex flex-col justify-between">

      <div>

        {/* User */}
        <div className="mb-12">

          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#111827] border border-white/10 mb-4">

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

          <h2 className="text-white text-xl font-bold">

            {profile.fullName || "User"}

          </h2>

          <p className="text-gray-400 mt-1">

            @{profile.username || "username"}

          </p>

        </div>

        {/* Navigation */}
        <nav className="space-y-3">

          {navItems.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className={`block px-5 py-4 rounded-2xl transition font-medium ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >

              {item.name}

            </Link>

          ))}
{profile.role ===
  "SUPER_ADMIN" && (

  <>
    <div className="border-t border-white/10 my-6" />

    <Link
      href="/admin"
      className="block px-5 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
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
        className="bg-red-600 hover:bg-red-700 px-5 py-4 rounded-2xl font-semibold transition"
      >

        Logout

      </button>

    </aside>
  );
}