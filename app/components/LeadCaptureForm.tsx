"use client";

import { useState } from "react";

export default function LeadCaptureForm({
  username,
}: {
  username: string;
}) {

  const [leadData, setLeadData] =
    useState({

      name: "",
      email: "",
      phone: "",
      company: "",

    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleLeadSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      setMessage("");

      const response =
        await fetch("/api/leads", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            username,

            ...leadData,

          }),

        });

      const data =
        await response.json();

      if (data.success) {

        setMessage(
          "✅ Information submitted successfully!"
        );

        setLeadData({

          name: "",
          email: "",
          phone: "",
          company: "",

        });

      } else {

        setMessage(
          "❌ Failed to submit"
        );

      }

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-2">

        Share Your Contact

      </h2>

      <p className="text-gray-400 mb-8">

        Leave your details and connect instantly.

      </p>

      <form
        onSubmit={handleLeadSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Your Name"
          value={leadData.name}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              name: e.target.value,
            })
          }
          required
          className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={leadData.email}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              email: e.target.value,
            })
          }
          required
          className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={leadData.phone}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              phone: e.target.value,
            })
          }
          className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <input
          type="text"
          placeholder="Company"
          value={leadData.company}
          onChange={(e) =>
            setLeadData({
              ...leadData,
              company: e.target.value,
            })
          }
          className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold text-lg disabled:opacity-50"
        >

          {loading
            ? "Submitting..."
            : "Submit Contact"}

        </button>

      </form>

      {message && (

        <div className="mt-5 text-lg">

          {message}

        </div>

      )}

    </div>
  );
}