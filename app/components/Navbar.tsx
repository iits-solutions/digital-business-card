"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="relative w-full bg-black border-b border-gray-800 px-8 py-5 flex items-center justify-between">

      <Link
        href="/"
        className="text-3xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors"
      >

        iLinq.Team

      </Link>

      <div className="hidden md:flex items-center gap-6 text-gray-300 text-sm font-medium">

        <Link
          href="/"
          className="hover:text-white transition"
        >

          Home

        </Link>

        <a
          href="#features"
          className="hover:text-white transition"
        >

          Features

        </a>

        <a
          href="#pricing"
          className="hover:text-white transition"
        >

          Pricing

        </a>

        <Link
          href="/login"
          className="hover:text-white transition"
        >

          Login

        </Link>

        <Link
          href="/signup"
          className="hover:text-white transition"
        >

          Signup

        </Link>

        <Link
          href="/admin"
          className="hover:text-red-400 transition"
        >
          Admin
        </Link>

            </div>

            {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-3xl"
      >
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-t border-gray-800 md:hidden">
          <div className="flex flex-col p-6 space-y-4">

            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>

            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>

            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              Signup
            </Link>

            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>

          </div>
        </div>
      )}

    </nav>
      );
}