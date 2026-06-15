import { prisma } from "@/lib/prisma";

export default async function ProfessionalProfileView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await prisma.businessProfile.findFirst({
    where: {
      id,
    },
  });

  if (!profile) {
    return (
      <div className="p-6 text-white">
        Professional Profile not found
      </div>
    );
  }

 const fullName =
  profile.displayName ||
  [
    profile.firstName,
    profile.middleName,
    profile.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Banner */}
      <section className="relative">

        <div className="h-52 bg-gradient-to-r from-blue-700 to-cyan-500"></div>

        <div className="max-w-5xl mx-auto px-6">

          {/* Profile Image */}
          <div className="-mt-20 mb-6">

            <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-[#081028] bg-[#111827] shadow-2xl">

              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
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

          {/* Name Section */}
          <div className="mb-10">

            <h1 className="text-5xl font-bold mb-3">
              {fullName}
            </h1>

            <p className="text-2xl text-blue-400 mb-2">
              @{profile.slug}
            </p>

            {profile.jobTitle && (
              <p className="text-xl text-white/90">
                {profile.jobTitle}
              </p>
            )}

            {profile.companyName && (
              <p className="text-lg text-gray-400 mt-2">
                {profile.companyName}
              </p>
            )}

          </div>

          {/* About */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-6">
              About Me
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">
              {profile.aboutMe || "No bio added yet."}
            </p>

          </div>
<div className="flex flex-wrap gap-4 mb-6">

  <a
    href={`/api/business-profiles/${profile.id}/vcard`}
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl font-medium"
  >
    Save Contact
  </a>

</div>

          {/* Social Links */}
          <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">

            <h2 className="text-3xl font-bold mb-8">
              Connect With Me
            </h2>

            <div className="flex flex-wrap gap-4">

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl"
                >
                  LinkedIn
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-2xl"
                >
                  GitHub
                </a>
              )}

              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-2xl"
                >
                  Instagram
                </a>
              )}

              {profile.youtube && (
                <a
                  href={profile.youtube}
                  target="_blank"
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl"
                >
                  YouTube
                </a>
              )}

              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl"
                >
                  WhatsApp
                </a>
              )}
              {profile.facebook && (
  <a
    href={profile.facebook}
    target="_blank"
    className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-2xl"
  >
    Facebook
  </a>
)}
{profile.twitter && (
  <a
    href={profile.twitter}
    target="_blank"
    className="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded-2xl"
  >
    Twitter/X
  </a>
)}
{profile.pinterest && (
  <a
    href={profile.pinterest}
    target="_blank"
    className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-2xl"
  >
    Pinterest
  </a>
)}
{profile.snapchat && (
  <a
    href={profile.snapchat}
    target="_blank"
    className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-2xl text-black"
  >
    Snapchat
  </a>
)}
{profile.bluesky && (
  <a
    href={profile.bluesky}
    target="_blank"
    className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-2xl"
  >
    Bluesky
  </a>
)}
{profile.googleReviews && (
  <a
    href={profile.googleReviews}
    target="_blank"
    className="bg-green-700 hover:bg-green-800 px-6 py-3 rounded-2xl"
  >
    Google Reviews
  </a>
)}
{profile.blogger && (
  <a
    href={profile.blogger}
    target="_blank"
    className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl"
  >
    Blogger
  </a>
)}

            </div>

          </div>

          {/* Contact Information */}

<div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">

  <h2 className="text-3xl font-bold mb-6">
    Contact Information
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {profile.primaryPhone && (
      <div>
        <p className="text-gray-400 mb-2">
          Primary Phone
        </p>

        <p className="text-xl font-medium">
          {profile.primaryPhone}
        </p>
      </div>
    )}

    {profile.secondaryPhone && (
      <div>
        <p className="text-gray-400 mb-2">
          Secondary Phone
        </p>

        <p className="text-xl font-medium">
          {profile.secondaryPhone}
        </p>
      </div>
    )}

    {profile.officePhone && (
      <div>
        <p className="text-gray-400 mb-2">
          Office Phone
        </p>

        <p className="text-xl font-medium">
          {profile.officePhone}
        </p>
      </div>
    )}

    {profile.email && (
      <div>
        <p className="text-gray-400 mb-2">
          Email
        </p>

        <p className="text-xl font-medium break-all">
          {profile.email}
        </p>
      </div>
    )}

    {profile.website && (
      <div>
        <p className="text-gray-400 mb-2">
          Website
        </p>

        <p className="text-xl font-medium break-all">
          {profile.website}
        </p>
      </div>
    )}

  </div>

</div>

{profile.address && (
  <div className="bg-[#081028] border border-white/10 rounded-3xl p-8 mb-8">
    <h2 className="text-3xl font-bold mb-6">
      Location
    </h2>

    <p className="text-lg text-gray-300">
      {profile.address}
    </p>

    <p className="text-lg text-gray-400 mt-2">
      {profile.city}, {profile.country}
    </p>
  </div>
)}

        </div>
      </section>
    </main>
  );
}