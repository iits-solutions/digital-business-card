"use client";

import { useSearchParams } from "next/navigation";

import { useState } from "react";

export default function ResetPasswordPage() {

  const searchParams =
    useSearchParams();

  const token =
    searchParams.get("token");

  const [password, setPassword] =
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
          "/api/reset-password",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              token,

              password,

            }),

          }
        );

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "✅ Password updated successfully"
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

    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#081028] border border-white/10 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-white mb-4">

          Reset Password

        </h1>

        <p className="text-gray-400 mb-10">

          Enter your new password below.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
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
              ? "Updating..."
              : "Update Password"}

          </button>

        </form>

        {message && (

          <div className="mt-6 text-center text-white">

            {message}

          </div>

        )}

      </div>

    </main>
  );
}