import { prisma } from "@/lib/prisma";
import LeadCaptureForm from "@/app/components/LeadCaptureForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClassicTemplatePage({
  params,
}: Props) {

  const { id } = await params;

  const profile =
    await prisma.businessProfile.findUnique({
      where: { id },
    });

  if (!profile) {
    return (
      <div className="text-white p-10">
        Profile Not Found
      </div>
    );
  }

  return (
  <main className="min-h-screen bg-black text-white">

    <div className="max-w-5xl mx-auto py-10 px-4">

      <div className="bg-[#081028] border border-white/10 rounded-3xl p-10">

        <div className="flex justify-center mb-8">

          {profile.profileImage ? (

            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-52 h-52 rounded-full object-cover border-4 border-blue-500"
            />

          ) : (

            <div className="w-52 h-52 rounded-full bg-gray-800 flex items-center justify-center text-6xl">

              {profile.firstName?.charAt(0)}

            </div>

          )}

        </div>

        <div className="text-center">

          <h1 className="text-5xl font-bold">

            {profile.firstName} {profile.lastName}

          </h1>
{profile.jobTitle && (
  <p className="text-2xl text-blue-400 mt-4">
    {profile.jobTitle}
  </p>
  )}
  {profile.companyName && (
  <p className="text-gray-400 text-lg mt-2">
    {profile.companyName}
  </p>
)}  
{profile.aboutMe && (

  <div className="mt-8 bg-black/30 rounded-2xl p-6">

    <h2 className="text-2xl font-bold mb-4">
      About Me
    </h2>

    <p className="text-gray-300 leading-relaxed">
      {profile.aboutMe}
    </p>

  </div>

)}
<div className="mt-8 flex justify-center">

  <button
    className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-8
      py-3
      rounded-2xl
      font-semibold
      text-lg
    "
  >
    Save Contact
  </button>

</div>
<div className="mt-12">

  <h2 className="text-3xl font-bold text-center mb-6">
    Connect With Me
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    {profile.linkedin && (
      <a
  href={profile.linkedin}
  target="_blank"
  className="bg-blue-600 rounded-xl p-4 text-center"
>
  🔗 LinkedIn
</a>
    )}

    {profile.github && (
      <a
  href={profile.github}
  target="_blank"
  className="bg-gray-800 rounded-xl p-4 text-center"
>
  🐙 GitHub
</a>
    )}

    {profile.instagram && (
      <a
  href={profile.instagram}
  target="_blank"
  className="bg-pink-600 rounded-xl p-4 text-center"
>
  📷 Instagram
</a>
    )}

    {profile.youtube && (
      <a
  href={profile.youtube}
  target="_blank"
  className="bg-red-600 rounded-xl p-4 text-center"
>
  ▶️ YouTube
</a>
    )}

    {profile.whatsapp && (
      <a
  href={`https://wa.me/${profile.whatsapp}`}
  target="_blank"
  className="bg-green-600 rounded-xl p-4 text-center"
>
  💬 WhatsApp
</a>
    )}

    {profile.twitter && (
      <a
  href={profile.twitter}
  target="_blank"
  className="bg-sky-500 rounded-xl p-4 text-center"
>
  𝕏 Twitter
</a>
    )}

  </div>

</div>

        </div>

      </div>

<LeadCaptureForm
  businessProfileId={profile.id}
/>

    </div>

  </main>
);
}