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

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-10">

          {/* Profile Image */}
          {profile.image && (

            <img
              src={profile.image}
              alt={profile.fullName}
              className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-blue-500"
            />

          )}

          {/* Name */}
          <h1 className="text-5xl font-bold mb-4">

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

            <p className="text-gray-300 text-lg mb-8">

              {profile.bio}

            </p>

          )}

          {/* Contact Info */}
          <div className="space-y-4">

            {profile.phone && (

              <div className="bg-black/30 rounded-2xl p-4">

                📱 {profile.phone}

              </div>

            )}

            {profile.website && (

              <a
                href={profile.website}
                target="_blank"
                className="block bg-black/30 rounded-2xl p-4 hover:bg-black/50 transition"
              >

                🌐 {profile.website}

              </a>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}