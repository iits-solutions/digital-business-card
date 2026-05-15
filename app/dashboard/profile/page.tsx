"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [profile, setProfile] = useState<any>({
    fullName: "",
    username: "",
    company: "",
    jobTitle: "",
    phone: "",
    bio: "",
    image: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response =
          await fetch("/api/profile");

        const data =
          await response.json();

        setProfile({

          fullName:
            data.fullName || "",

          username:
            data.username || "",

          company:
            data.company || "",

          jobTitle:
            data.jobTitle || "",

          phone:
            data.phone || "",

          bio:
            data.bio || "",

          image:
            data.image || "",

          linkedin:
            data.linkedin || "",

          github:
            data.github || "",

          twitter:
            data.twitter || "",

          instagram:
            data.instagram || "",

          youtube:
            data.youtube || "",

          whatsapp:
            data.whatsapp || "",

        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  const handleSave = async () => {

    try {

      setLoading(true);

      const response =
        await fetch("/api/profile", {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(profile),

        });

      const data =
        await response.json();

      if (data.success) {

        alert("Profile updated");

      } else {

        alert("Something went wrong");

      }

    } catch (error) {

      console.log(error);

      alert("Error saving profile");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">

          My Profile

        </h1>

        <p className="text-gray-400">

          Manage your digital business profile

        </p>

      </div>

      {/* Form Card */}
      <div className="bg-[#081028] border border-white/10 rounded-3xl p-10 max-w-6xl">

        {/* Image */}
        <div className="flex items-center gap-6 mb-10">

          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#111827]">

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

          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition">

            Upload Image

          </button>

        </div>

        {/* Full Name + Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Full Name */}
          <div>

            <label className="block mb-3 text-gray-300">

              Full Name

            </label>

            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  fullName:
                    e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />

          </div>

          {/* Username */}
          <div>

            <label className="block mb-3 text-gray-300">

              Username

            </label>

            <input
              type="text"
              value={profile.username}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username:
                    e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* Company + Job Title + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

          {/* Company */}
          <div>

            <label className="block mb-3 text-gray-300">

              Company

            </label>

            <input
              type="text"
              value={profile.company}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  company:
                    e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />

          </div>

          {/* Job Title */}
          <div>

            <label className="block mb-3 text-gray-300">

              Job Title

            </label>

            <input
              type="text"
              value={profile.jobTitle}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  jobTitle:
                    e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            />

          </div>

          {/* Phone Number */}
          <div>

            <label className="block mb-3 text-gray-300">

              Phone Number

            </label>

            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone:
                    e.target.value,
                })
              }
              className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
              placeholder="+92 300 1234567"
            />

          </div>

        </div>

        {/* About */}
        <div className="mt-8">

          <label className="block mb-3 text-gray-300">

            About Me

          </label>

          <textarea
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio:
                  e.target.value,
              })
            }
            rows={5}
            className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
          />

        </div>

        {/* Social Links */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">

            Social Links

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="LinkedIn"
              value={profile.linkedin}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedin:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="GitHub"
              value={profile.github}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  github:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Twitter"
              value={profile.twitter}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  twitter:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Instagram"
              value={profile.instagram}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  instagram:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="YouTube"
              value={profile.youtube}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  youtube:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={profile.whatsapp}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  whatsapp:
                    e.target.value,
                })
              }
              className="bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

        </div>

        {/* Save Button */}
        <div className="mt-10">

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl transition"
          >

            {loading
              ? "Saving..."
              : "Save Profile"}

          </button>

        </div>

      </div>

    </main>
  );
}