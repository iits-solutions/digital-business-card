"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      setMessage("");

      const response =
        await fetch(
          "/api/forgot-password",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
            }),

          }
        );

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "If an account exists, a reset link has been sent to your email."
        );

      } else {

        setMessage(
          data.error ||
          "Something went wrong"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

  <main className="min-h-screen bg-black flex items-center justify-center px-6 relative">

    <a
      href="/"
      className="absolute top-8 left-8 text-white hover:text-blue-400 transition flex items-center gap-2 text-lg"
    >
      ← Home
    </a>

    <div className="w-full max-w-md bg-[#081028] border border-white/10 rounded-3xl p-10">

      <h1 className="text-5xl font-bold text-white mb-4">

        Forgot Password

        </h1>

        <p className="text-gray-400 mb-10">
  Enter your email to receive a password reset link.
</p>

<form
  onSubmit={handleSubmit}
  className="space-y-6"
>

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    required
    className="w-full bg-black text-white border border-white/10 rounded-2xl px-5 py-4 outline-none"
  />

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold text-white"
  >

    {loading
      ? "Sending..."
      : "Send Reset Link"}

  </button>

</form>

<div className="text-center mt-4 text-gray-400">
  Remember your password?{" "}
  <a
    href="/login"
    className="text-blue-400 hover:text-blue-300 transition"
  >
    Sign In
  </a>
</div>

{message && (

  <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">

    <p className="text-green-400 font-medium">

      {message}

    </p>

  </div>

)}

      </div>

    </main>
  );
}