"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await signIn("credentials", {

          email:
            formData.email,

          password:
            formData.password,

          redirect: false,

        });

      if (result?.error) {

        alert("Invalid credentials");

        return;

      }

      router.push("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative">

      {/* Back Button */}
      <a
        href="/"
        className="absolute top-8 left-8 text-white hover:text-blue-400 transition flex items-center gap-2 text-lg"
      >

        ← Back to Home

      </a>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold mb-3">

          Welcome Back

        </h1>

        <p className="text-gray-400 mb-10 text-lg">

          Login to your ILinq account

        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

          {/* Button */}
          <div className="mt-5 text-center">

          <a
               href="/forgot-password"
               className="text-blue-400 hover:text-blue-300 transition"
          >

             Forgot Password?

          </a>

          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold text-lg"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>

      </div>

    </main>
  );
}