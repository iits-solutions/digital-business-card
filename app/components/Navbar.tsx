import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="w-full bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">

      <Link
        href="/"
        className="text-2xl font-bold text-white"
      >

        ILinq

      </Link>

      <div className="flex gap-5 text-gray-300">

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

      </div>

    </nav>
  );
}