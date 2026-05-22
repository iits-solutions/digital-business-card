"use client";

import QRCode from "react-qr-code";

import * as htmlToImage from "html-to-image";

import { useEffect, useRef, useState } from "react";

export default function QRPage() {

  const [profile, setProfile] =
    useState<any>(null);

  const qrRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response =
          await fetch("/api/profile");

        const data =
          await response.json();

        setProfile(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProfile();

  }, []);

  const downloadQR = async () => {

    if (!qrRef.current) return;

    const dataUrl =
      await htmlToImage.toPng(
        qrRef.current
      );

    const link =
      document.createElement("a");

    link.download =
      `${profile.username}-qr.png`;

    link.href = dataUrl;

    link.click();

  };

  if (!profile) {

    return (

      <main className="min-h-screen bg-black text-white p-10">

        Loading...

      </main>

    );
  }

  // QR tracking route
  // Live public profile URL
const profileUrl =
`https://ilinq.team/${profile.username}`;

  return (

    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">

          My QR Code

        </h1>

        <p className="text-gray-400">

          Share your digital business card instantly

        </p>

      </div>

      {/* QR Card */}
      <div
        ref={qrRef}
        className="max-w-xl bg-[#081028] border border-white/10 rounded-3xl p-10"
      >

        {/* Profile */}
        <div className="flex items-center gap-5 mb-10">

          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#111827]">

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

          <div>

            <h2 className="text-2xl font-bold">

              {profile.fullName}

            </h2>

            <p className="text-blue-400">

              @{profile.username}

            </p>

          </div>

        </div>

        {/* QR */}
        <div className="bg-white p-6 rounded-3xl inline-block">

          <QRCode
            value={profileUrl}
            size={250}
          />

        </div>

        {/* URL */}
        <div className="mt-8">

          <p className="text-gray-400 mb-2">

            QR Tracking URL

          </p>

          <p className="break-all text-lg">

            {profileUrl}

          </p>

        </div>

        {/* Download */}
        <div className="mt-10">

          <button
            onClick={downloadQR}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl transition"
          >

            Download QR

          </button>

        </div>

      </div>

    </main>
  );
}