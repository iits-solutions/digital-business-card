import { prisma } from "@/lib/prisma";

export default async function ProfileEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile =
    await prisma.businessProfile.findFirst({
      where: {
        id,
      },
    });

  if (!profile) {
    return (
      <div className="p-6 text-white">
        Profile not found
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Edit Professional Profile
      </h1>

     <div className="bg-[#081028] rounded-xl p-6">
<h2 className="text-xl font-bold mb-4">
  Profile Branding
</h2>

<div className="grid md:grid-cols-3 gap-4 mb-8">

  <div>
    <label className="block mb-2">
      Profile Image
    </label>

    <input
      type="file"
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label className="block mb-2">
      Company Logo
    </label>

    <input
      type="file"
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label className="block mb-2">
      Background Image
    </label>

    <input
      type="file"
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

</div>

  <h2 className="text-xl font-bold mb-4">
    Professional Information
  </h2>

  <div className="grid gap-4">

    <input
      defaultValue={profile.firstName}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="First Name"
    />

    <input
      defaultValue={profile.middleName ?? ""}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="Middle Name"
    />

    <input
      defaultValue={profile.lastName}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="Last Name"
    />

    <input
      defaultValue={profile.companyName}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="Company Name"
    />

    <input
      defaultValue={profile.jobTitle}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="Job Title"
    />

    <input
      defaultValue={profile.city}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="City"
    />

    <input
      defaultValue={profile.country}
      className="bg-black border border-gray-700 rounded p-2"
      placeholder="Country"
    />

<h2 className="text-xl font-bold mb-2 mt-4">
  Contact Information
</h2>

<div className="grid gap-4">

  <label>Primary Phone</label>
  <input
    defaultValue={profile.primaryPhone}
    className="bg-black border border-gray-700 rounded p-2"
  />

  <label>Secondary Phone</label>
  <input
    defaultValue={profile.secondaryPhone ?? ""}
    className="bg-black border border-gray-700 rounded p-2"
  />

  <label>Office Phone</label>
  <input
    defaultValue={profile.officePhone ?? ""}
    className="bg-black border border-gray-700 rounded p-2"
  />

  <label>Extension</label>
  <input
    defaultValue={profile.extension ?? ""}
    className="bg-black border border-gray-700 rounded p-2"
  />

  <label>Email</label>
  <input
    defaultValue={profile.email}
    className="bg-black border border-gray-700 rounded p-2"
  />

  <label>Website</label>
  <input
    defaultValue={profile.website ?? ""}
    className="bg-black border border-gray-700 rounded p-2"
  />
<h2 className="text-xl font-bold mb-0 mt-0">
  About Me
</h2>
<textarea
  defaultValue={profile.aboutMe ?? ""}
  rows={5}
  className="w-full bg-black border border-gray-700 rounded p-3"
/>
<h2 className="text-xl font-bold mb-4 mt-8">
  Social Links
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label>LinkedIn</label>
    <input
      defaultValue={profile.linkedin ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>GitHub</label>
    <input
      defaultValue={profile.github ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Instagram</label>
    <input
      defaultValue={profile.instagram ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>YouTube</label>
    <input
      defaultValue={profile.youtube ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>WhatsApp</label>
    <input
      defaultValue={profile.whatsapp ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Twitter/X</label>
    <input
      defaultValue={profile.twitter ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Facebook</label>
    <input
      defaultValue={profile.facebook ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Pinterest</label>
    <input
      defaultValue={profile.pinterest ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Bluesky</label>
    <input
      defaultValue={profile.bluesky ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Snapchat</label>
    <input
      defaultValue={profile.snapchat ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Google Reviews</label>
    <input
      defaultValue={profile.googleReviews ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>

  <div>
    <label>Blogger</label>
    <input
      defaultValue={profile.blogger ?? ""}
      className="w-full bg-black border border-gray-700 rounded p-2"
    />
  </div>
<div className="mt-8 flex justify-end">
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-medium">
        Save Changes
  </button>
</div>
</div>
</div>

  </div>

</div>

</div>
  );}