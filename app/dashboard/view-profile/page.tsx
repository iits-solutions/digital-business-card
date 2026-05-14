"use client";

import { useEffect, useState } from "react";

export default function ViewProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

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

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, []);

  if (loading) {

    return (

      <main className="min-h-screen bg-black text-white p-10">

        Loading...

      </main>

    );
  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative">

        {/* Banner */}
        <div className="h-52 bg-gradient-to-r from-blue-700 to-cyan-500"></div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6">

          {/* Avatar */}
          <div className="-mt-20 mb-6">

            <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-[#081028] bg-[#111827] shadow-2xl">

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

          </div>

          {/* Name */}
          <div className="mb-10">

            <h1 className="text-5xl font-bold mb-3">

              {profile.fullName}

            </h1>

            <p className="text-2xl text-blue-400 mb-2">

              @{profile.username}

            </p>

            {/* Job Title */}
            {profile.jobTitle && (

              <p className="text-xl text-white/90">

                {profile.jobTitle}

              </p>

            )}

            {/* Company */}
            {profile.company && (

              <p className="text-lg text-gray-400 mt-2">

                {profile.company}

              </p>

            )}

          </div>

          {/* About */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-6">

              About Me

            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">

              {profile.bio || "No bio added yet."}

            </p>

          </div>

          {/* Contact */}
          {/* Social Links */}
<div className="max-w-5xl mx-auto px-6 pb-20">

  <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

    <h2 className="text-3xl font-bold mb-8">
      Connect With Me
    </h2>

    <div className="flex flex-wrap gap-4">

      {/* LinkedIn */}
      {profile.linkedin && (

        <a
          href={profile.linkedin}
          target="_blank"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition"
        >
          LinkedIn
        </a>

      )}

      {/* GitHub */}
      {profile.github && (

        <a
          href={profile.github}
          target="_blank"
          className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-2xl transition"
        >
          GitHub
        </a>

      )}

      {/* Twitter */}
      {profile.twitter && (

        <a
          href={profile.twitter}
          target="_blank"
          className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-2xl transition"
        >
          Twitter/X
        </a>

      )}

      {/* Instagram */}
      {profile.instagram && (

        <a
          href={profile.instagram}
          target="_blank"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-2xl transition"
        >
          Instagram
        </a>

      )}

      {/* YouTube */}
      {profile.youtube && (

        <a
          href={profile.youtube}
          target="_blank"
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl transition"
        >
          YouTube
        </a>

      )}

      {/* WhatsApp */}
      {profile.whatsapp && (

        <a
          href={`https://wa.me/${profile.whatsapp}`}
          target="_blank"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl transition"
        >
          WhatsApp
        </a>

      )}

    </div>

  </div>

</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">

            {/* Email */}
            <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 mb-3">

                Email

              </p>

              <p className="text-xl font-medium break-all">

                {profile.email}

              </p>

            </div>

            {/* Website */}
            <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 mb-3">

                Website

              </p>

              <p className="text-xl font-medium">

                {profile.website || "Not added"}

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}