import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

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

  const profile =
    await prisma.profile.findUnique({

      where: {
        username,
      },

      include: {
        user: true,
      },

    });

  if (!profile) {
    notFound();
  }

  // Increment Profile Views
  await prisma.analytics.update({

    where: {
      userId: profile.userId,
    },

    data: {

      profileViews: {
        increment: 1,
      },

    },

  });

  // vCard
  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
ORG:${profile.company || ""}
TITLE:${profile.jobTitle || ""}
TEL:${profile.phone || ""}
EMAIL:${profile.user.email}
END:VCARD
`;

  return (

    <main className="min-h-screen bg-black text-white pb-32">

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
                  alt={profile.fullName}
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

          {/* Desktop Save Contact */}
          <div className="hidden md:block mb-10">

            <a
              href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`}
              download={`${profile.fullName}.vcf`}
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl transition font-medium"
            >

              Save Contact

            </a>

          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* Email */}
            <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 mb-3">

                Email

              </p>

              <p className="text-xl font-medium break-all">

                {profile.user.email}

              </p>

            </div>

            {/* Phone */}
            <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 mb-3">

                Phone

              </p>

              {profile.phone ? (

                <a
                  href={`tel:${profile.phone}`}
                  className="text-xl font-medium hover:text-blue-400 transition"
                >

                  {profile.phone}

                </a>

              ) : (

                <p className="text-xl font-medium">

                  Not added

                </p>

              )}

            </div>

          </div>

          {/* Social Links */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-20">

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
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl transition"
                >

                  WhatsApp

                </a>

              )}

            </div>

          </div>

        </div>

      </section>

      {/* Mobile Save Contact */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur md:hidden">

        <a
          href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`}
          download={`${profile.fullName}.vcf`}
          className="block text-center bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-medium transition"
        >

          Save Contact

        </a>

      </div>

    </main>
  );
}