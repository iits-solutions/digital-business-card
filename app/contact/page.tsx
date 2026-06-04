"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setSuccess(
        "Message sent successfully!"
      );

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError(
        "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}

        <div className="mb-8">
  <Link
    href="/"
    className="inline-flex items-center px-4 py-2 border border-blue-700 rounded-lg bg-blue-950 hover:bg-blue-900 transition"
  >
    ← Back to Home
  </Link>
</div>
        <div className="text-center mb-16">

          <Image
            src="/iLinq-logo.png"
            alt="iLinq.Team"
            width={200}
            height={200}
            priority
            className="mx-auto mb-6"
          />

          <h1 className="text-5xl font-bold mb-4">
            Contact Us
          </h1>

          <p className="text-xl text-gray-400">
            We'd love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📧</div>

            <h3 className="font-bold text-xl mb-2">
              Email
            </h3>

            <p className="text-gray-400">
              support@ilinq.team
            </p>
          </div>

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📍</div>

            <h3 className="font-bold text-xl mb-2">
              Location
            </h3>

            <p className="text-gray-400">
              Sialkot, Punjab, Pakistan
            </p>
          </div>

          <div className="bg-[#08142f] border border-blue-900 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⏱️</div>

            <h3 className="font-bold text-xl mb-2">
              Response Time
            </h3>

            <p className="text-gray-400">
              Usually within 24-48 hours
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-[#08142f] border border-blue-900 rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Send Us a Message
          </h2>

          <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

            <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
  className="w-full p-4 rounded-lg bg-black border border-blue-900"
/>

            <input
  type="email"
  placeholder="Your Email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  className="w-full p-4 rounded-lg bg-black border border-blue-900"
/>

            <input
  type="text"
  placeholder="Subject"
  value={subject}
  onChange={(e) =>
    setSubject(e.target.value)
  }
  className="w-full p-4 rounded-lg bg-black border border-blue-900"
/>

            <textarea
  placeholder="Your Message"
  rows={6}
  value={message}
  onChange={(e) =>
    setMessage(e.target.value)
  }
  className="w-full p-4 rounded-lg bg-black border border-blue-900"
/>

{success && (
  <div className="bg-green-900 border border-green-600 text-green-300 p-4 rounded-lg">
    {success}
  </div>
)}

{error && (
  <div className="bg-red-900 border border-red-600 text-red-300 p-4 rounded-lg">
    {error}
  </div>
)}

<button
  type="submit"
  disabled={loading}
  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
>
  {loading ? "Sending..." : "Send Message"}
</button>

          </form>

        </div>

      </div>
    </main>
  );
}