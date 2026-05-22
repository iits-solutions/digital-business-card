"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

export default function NFCPage() {

  const { data: session } =
    useSession();

  const [supported, setSupported] =
    useState(false);

  const [writing, setWriting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [profileUrl, setProfileUrl] =
    useState("");

  // Detect NFC Support
  useEffect(() => {

    if ("NDEFReader" in window) {

      setSupported(true);

    }

  }, []);

  // Fetch REAL profile username
  useEffect(() => {

    const fetchProfile = async () => {

      if (!session?.user?.email) return;

      try {

        const response =
          await fetch(
            `/api/profile-by-email?email=${session.user.email}`
          );

        const data =
          await response.json();

        if (data?.username) {

          const response =
          await fetch("/api/profile");

          const data =
          await response.json();

          const username =
          data.username;

        setProfileUrl(
           `https://ilinq.team/${username}`
        );

        }

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, [session]);

  // Write NFC
  const writeNFC = async () => {

    try {

      setWriting(true);

      setMessage("");

      // @ts-ignore
      const ndef = new NDEFReader();

      await ndef.write({
        records: [
          {
            recordType: "url",
            data: profileUrl,
          },
        ],
      });

      setMessage(
        "✅ NFC card written successfully!"
      );

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Failed to write NFC tag"
      );

    } finally {

      setWriting(false);

    }

  };

  // Copy URL
  const copyUrl = async () => {

    try {

      await navigator.clipboard.writeText(
        profileUrl
      );

      setMessage(
        "✅ NFC URL copied!"
      );

    } catch {

      setMessage(
        "❌ Failed to copy URL"
      );

    }

  };

  return (

    <main className="min-h-screen bg-black text-white p-4 md:p-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">

            NFC Tools

          </h1>

          <p className="text-gray-400 text-lg">

            Write your digital profile directly to NFC cards and tags.

          </p>

        </div>

        {/* NFC Status */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">

          <h2 className="text-2xl font-bold mb-4">

            NFC Compatibility

          </h2>

          {supported ? (

            <p className="text-green-400">

              ✅ Your device supports Web NFC

            </p>

          ) : (

            <div>

              <p className="text-red-400 mb-3">

                ❌ Web NFC not supported on this device

              </p>

              <p className="text-gray-400">

                Best supported on Android Chrome.

              </p>

            </div>

          )}

        </div>

        {/* NFC Writer */}
        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-4">

            Write NFC Card

          </h2>

          <p className="text-gray-400 mb-6">

            Tap the button below and hold your NFC card near your phone.

          </p>

          {/* Profile URL */}
          <div className="bg-black border border-white/10 rounded-2xl p-4 mb-6 break-all text-sm text-gray-300">

            {profileUrl || "Loading profile URL..."}

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={writeNFC}
              disabled={
                !supported ||
                writing ||
                !profileUrl
              }
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >

              {writing
                ? "Writing NFC..."
                : "Write NFC Card"}

            </button>

            <button
              onClick={copyUrl}
              className="bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >

              Copy NFC URL

            </button>

          </div>

          {/* Message */}
          {message && (

            <div className="mt-6 text-lg">

              {message}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}