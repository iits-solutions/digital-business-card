"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({

    fullName: "",
    username: "",
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

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await fetch("/api/signup", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...formData,

            username:
              formData.username.toLowerCase(),

          }),

        });

      const data =
        await response.json();

      if (!response.ok) {

        alert(data.error || "Signup failed");

        return;

      }

      alert("Account created successfully");

      router.push("/login");

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

        ← Home

      </a>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold mb-3">

          Create Account

        </h1>

        <p className="text-gray-400 mb-10 text-lg">

          Start building your digital identity

        </p>

        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
          />

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
          <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold text-lg"
>
  {loading
    ? "Creating Account..."
    : "Create Account"}
</button>

<div className="text-center mt-4 text-gray-400">
  Already have an account?{" "}
  <a
    href="/login"
    className="text-blue-400 hover:text-blue-300 transition"
  >
    Sign In
  </a>
</div>

        </form>

      </div>

    </main>
  );
}