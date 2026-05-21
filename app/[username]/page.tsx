import LeadCaptureForm from "@/app/components/LeadCaptureForm";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import {

  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
  FaGlobe,

} from "react-icons/fa";

interface Props {

  params: Promise<{
    username: string;
  }>;

}

export default async function PublicProfilePage({
  params,
}: Props) {

  const { username } =
    await params;

  // Find profile
  const profile =
    await prisma.profile.findFirst({

      where: {

        username: {
          equals: username,
          mode: "insensitive",
        },

      },

    });

  // If profile not found
  if (!profile) {

    notFound();

  }

  // Increment Profile Views
  await prisma.analytics.upsert({

    where: {
      userId: profile.userId,
    },

    update: {

      profileViews: {
        increment: 1,
      },

    },

    create: {

      userId: profile.userId,

      profileViews: 1,

      qrScans: 0,

      nfcTaps: 0,

      leads: 0,

    },

  });

  // Create activity log
  await prisma.activity.create({

    data: {

      type: "PROFILE_VIEW",

      message:
        `${profile.fullName} profile viewed`,

      userId:
        profile.userId,

    },

  });

  return (

    <main className="min-h-screen bg-black text-white px-4 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-10">

          {/* Profile Image */}
<div className="flex justify-center mb-8 overflow-hidden">

  {profile.image ? (

    <img
      src={profile.image}
      alt={profile.fullName}
      className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-500 shadow-2xl mx-auto"
    />

  ) : (

    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gray-800 flex items-center justify-center text-5xl font-bold border-4 border-blue-500">

      {profile.fullName
        ?.charAt(0)}

    </div>

  )}

</div>

          {/* Profile Content */}
          <div className="mt-10 text-center">

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              {profile.fullName}

            </h1>

            {/* Job Title */}
            {profile.jobTitle && (

              <p className="text-2xl text-blue-400 mb-2">

                {profile.jobTitle}

              </p>

            )}

            {/* Company */}
            {profile.company && (

              <p className="text-gray-400 text-lg mb-6">

                {profile.company}

              </p>

            )}

            {/* Bio */}
            {profile.bio && (

              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-10">

                {profile.bio}

              </p>

            )}

          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {profile.phone && (

              <a
                href={`tel:${profile.phone}`}
                className="bg-black/30 hover:bg-black/50 transition rounded-2xl p-5 flex items-center gap-4 border border-white/5"
              >

                <span className="text-2xl">

                  📱

                </span>

                <span className="text-lg">

                  {profile.phone}

                </span>

              </a>

            )}

            {profile.website && (

              <a
                href={profile.website}
                target="_blank"
                className="bg-black/30 hover:bg-black/50 transition rounded-2xl p-5 flex items-center gap-4 border border-white/5"
              >

                <FaGlobe size={24} />

                <span className="text-lg break-all">

                  {profile.website}

                </span>

              </a>

            )}

          </div>

          {/* Save Contact */}
          <div className="mt-10 flex justify-center">

            <a
              href={`/api/vcard/${profile.username}`}
              className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >

              Save Contact

            </a>

          </div>

          {/* Social Links */}
          <div className="mt-12">

            <h2 className="text-3xl font-bold mb-8 text-center">

              Connect With Me

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {profile.linkedin && (

                <a
                  href={profile.linkedin}
                  target="_blank"
                  className="bg-[#0077B5] hover:opacity-90 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaLinkedin size={24} />

                  <span>LinkedIn</span>

                </a>

              )}

              {profile.github && (

                <a
                  href={profile.github}
                  target="_blank"
                  className="bg-gray-900 hover:bg-gray-800 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaGithub size={24} />

                  <span>GitHub</span>

                </a>

              )}

              {profile.instagram && (

                <a
                  href={profile.instagram}
                  target="_blank"
                  className="bg-pink-600 hover:bg-pink-500 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaInstagram size={24} />

                  <span>Instagram</span>

                </a>

              )}

              {profile.youtube && (

                <a
                  href={profile.youtube}
                  target="_blank"
                  className="bg-red-600 hover:bg-red-500 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaYoutube size={24} />

                  <span>YouTube</span>

                </a>

              )}

              {profile.whatsapp && (

                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-500 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaWhatsapp size={24} />

                  <span>WhatsApp</span>

                </a>

              )}

              {profile.twitter && (

                <a
                  href={profile.twitter}
                  target="_blank"
                  className="bg-sky-500 hover:bg-sky-400 transition rounded-2xl p-5 flex items-center justify-center gap-3 font-medium"
                >

                  <FaTwitter size={24} />

                  <span>Twitter</span>

                </a>

              )}

            </div>

          </div>

        </div>

        {/* Lead Capture Form */}
        <LeadCaptureForm
          username={profile.username}
        />

      </div>

    </main>
  );
}