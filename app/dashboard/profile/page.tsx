"use client";

import { useEffect, useState, ChangeEvent } from "react";

import { supabase } from "@/lib/supabase";

export default function ProfilePage() {

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [profile, setProfile] = useState({

  fullName: "",
  username: "",
  bio: "",
  image: "",
  company: "",
  jobTitle: "",

  linkedin: "",
  github: "",
  twitter: "",
  instagram: "",
  youtube: "",
  whatsapp: "",

});

  // Upload Image
  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {

    try {

      setUploading(true);

      const file = e.target.files?.[0];

      if (!file) return;

      const fileName =
        `${Date.now()}-${file.name}`;

      const { error } =
        await supabase.storage
          .from("profiles")
          .upload(fileName, file);

      if (error) {

          console.log(error);

          alert(error.message);

          return;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("profiles")
        .getPublicUrl(fileName);

      setProfile({

        ...profile,

        image:
          publicUrlData.publicUrl,

      });

      alert("Image uploaded!");

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setUploading(false);

    }
  };

  // Save Profile
  const saveProfile = async () => {

    try {

      const response = await fetch(
        "/api/profile",
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(profile),

        }
      );

      if (response.ok) {

        alert(
          "Profile updated successfully!"
        );

      } else {

        alert(
          "Failed to update profile"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }
  };

  // Fetch Profile
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

  bio:
    data.bio || "",

  image:
    data.image || "",

  company:
    data.company || "",

  jobTitle:
    data.jobTitle || "",
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

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, []);

  // Loading
  if (loading) {

    return (

      <main className="min-h-screen bg-[#0f172a] text-white p-10">

        Loading...

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#0f172a] text-white p-10">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">
          My Profile
        </h1>

        <p className="text-gray-400">
          Manage your digital business profile
        </p>

      </div>

      {/* Profile Image */}
      <div className="mb-10">

        <div className="flex items-center gap-6">

          {/* Preview */}
          <div className="w-32 h-32 rounded-3xl overflow-hidden bg-[#111827] border border-white/10">

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

          {/* Upload */}
          <div>

            <label className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl cursor-pointer transition inline-block">

              {
                uploading
                  ? "Uploading..."
                  : "Upload Image"
              }

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={
                  handleImageUpload
                }
              />

            </label>

          </div>

        </div>

      </div>

      {/* Profile Form */}
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-10 max-w-5xl">

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
{/* Company + Job Title */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

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

</div>
        {/* About */}
        <div className="mt-8">

          <label className="block mb-3 text-gray-300">
            About Me
          </label>

          <textarea
            rows={5}
            value={profile.bio}
            onChange={(e) =>
              setProfile({

                ...profile,

                bio:
                  e.target.value,

              })
            }
            className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
          ></textarea>

        </div>
{/* Social Links */}
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-6">
    Social Links
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* LinkedIn */}
    <input
      type="text"
      placeholder="LinkedIn URL"
      value={profile.linkedin}
      onChange={(e) =>
        setProfile({
          ...profile,
          linkedin: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

    {/* GitHub */}
    <input
      type="text"
      placeholder="GitHub URL"
      value={profile.github}
      onChange={(e) =>
        setProfile({
          ...profile,
          github: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

    {/* Twitter */}
    <input
      type="text"
      placeholder="Twitter/X URL"
      value={profile.twitter}
      onChange={(e) =>
        setProfile({
          ...profile,
          twitter: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

    {/* Instagram */}
    <input
      type="text"
      placeholder="Instagram URL"
      value={profile.instagram}
      onChange={(e) =>
        setProfile({
          ...profile,
          instagram: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

    {/* YouTube */}
    <input
      type="text"
      placeholder="YouTube URL"
      value={profile.youtube}
      onChange={(e) =>
        setProfile({
          ...profile,
          youtube: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

    {/* WhatsApp */}
    <input
      type="text"
      placeholder="WhatsApp Number"
      value={profile.whatsapp}
      onChange={(e) =>
        setProfile({
          ...profile,
          whatsapp: e.target.value,
        })
      }
      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
    />

  </div>

</div>
        {/* Save Button */}
        <div className="mt-10">

          <button
            onClick={saveProfile}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-medium transition"
          >

            Save Profile

          </button>

        </div>

      </div>

    </main>
  );
}