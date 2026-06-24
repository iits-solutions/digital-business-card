import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ImageUploader from "@/app/components/ImageUploader";
import ClassicTemplate from "./templates/ClassicTemplate";
async function updateProfessionalProfile(
  formData: FormData
) {
  "use server";

  const id = String(formData.get("id"));

  await prisma.businessProfile.update({
    where: {
      id,
    },
    data: {
      firstName: String(formData.get("firstName")),
      middleName:
        String(formData.get("middleName")) || null,
      lastName: String(formData.get("lastName")),

      companyName: String(
        formData.get("companyName")
      ),
      displayName:
  String(formData.get("displayName")) || null,

address:
  String(formData.get("address")) || null,

facebook:
  String(formData.get("facebook")) || null,

pinterest:
  String(formData.get("pinterest")) || null,

bluesky:
  String(formData.get("bluesky")) || null,

snapchat:
  String(formData.get("snapchat")) || null,

googleReviews:
  String(formData.get("googleReviews")) || null,

blogger:
  String(formData.get("blogger")) || null,
      jobTitle: String(formData.get("jobTitle")),

      city: String(formData.get("city")),

      country: String(
        formData.get("country")
      ),

      primaryPhone: String(
        formData.get("primaryPhone")
      ),

      secondaryPhone:
        String(formData.get("secondaryPhone")) ||
        null,

      officePhone:
        String(formData.get("officePhone")) ||
        null,

      extension:
        String(formData.get("extension")) ||
        null,

      email: String(formData.get("email")),

      website:
        String(formData.get("website")) || null,

      aboutMe:
        String(formData.get("aboutMe")) || null,

      linkedin:
        String(formData.get("linkedin")) || null,

      github:
        String(formData.get("github")) || null,

      instagram:
        String(formData.get("instagram")) || null,

      youtube:
        String(formData.get("youtube")) || null,

      whatsapp:
        String(formData.get("whatsapp")) || null,

      twitter:
        String(formData.get("twitter")) || null,
      profileImage:
        String(formData.get("profileImageUrl")) || null,

      companyLogo:
        String(formData.get("companyLogoUrl")) || null,

      backgroundImage:
        String(formData.get("backgroundImageUrl")) || null,  
    },
  });

  redirect("/dashboard/business-profiles");
}
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
    <div className="mb-8">
  <h1 className="text-5xl font-bold text-white">
    Edit Professional Profile
  </h1>

  <p className="text-gray-300 mt-2">
    Manage your professional identity
  </p>
</div>

<form
  action={updateProfessionalProfile}
  className="bg-[#081028] rounded-xl p-6"
>
  <input
    type="hidden"
    name="id"
    value={profile.id}
  />

  <h2 className="text-2xl font-semibold mb-4 text-white">
    Profile Branding
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mb-8">

 {/* Profile Image */}
<ImageUploader
  label="Profile Image"
  currentImage={profile.profileImage}
/>

  {/* Company Logo */}
  <ImageUploader
  label="Company Logo"
  currentImage={profile.companyLogo}
/>

  <ImageUploader
  label="Background Image"
  currentImage={profile.backgroundImage}
/>  

</div>

  <h2 className="text-2xl font-semibold mb-4 text-white">
    Professional Information
  </h2>

  <div className="grid gap-4 mb-8">
    <input
    name="firstName"
    defaultValue={profile.firstName}
    className="bg-black border border-gray-700 rounded p-2"
    placeholder="First Name" />
    <input
    name="middleName"
    defaultValue={profile.middleName ?? ""} className="bg-black border border-gray-700 rounded p-2" 
    placeholder="Middle Name" />
    <input
    name="lastName"
    defaultValue={profile.lastName}
    className="bg-black border border-gray-700 rounded p-2"
    placeholder="Last Name" />
    <input
  name="displayName"
  defaultValue={profile.displayName ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Display Name" />
    <input name="companyName" defaultValue={profile.companyName} className="bg-black border border-gray-700 rounded p-2" placeholder="Company Name" />
    <input name="jobTitle" defaultValue={profile.jobTitle} className="bg-black border border-gray-700 rounded p-2" placeholder="Job Title" />
    <input name="city" defaultValue={profile.city} className="bg-black border border-gray-700 rounded p-2" placeholder="City" />
    <input name="country" defaultValue={profile.country} className="bg-black border border-gray-700 rounded p-2" placeholder="Country" />
  </div>

  <h2 className="text-2xl font-semibold mb-4 text-white">
    Contact Information
  </h2>

  <div className="grid gap-4 mb-8">
    <input name="primaryPhone" defaultValue={profile.primaryPhone} className="bg-black border border-gray-700 rounded p-2" placeholder="Primary Phone" />
    <input name="secondaryPhone" defaultValue={profile.secondaryPhone ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Secondary Phone" />
    <input name="officePhone" defaultValue={profile.officePhone ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Office Phone" />
    <input name="extension" defaultValue={profile.extension ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Extension" />
    <input name="email" defaultValue={profile.email} className="bg-black border border-gray-700 rounded p-2" placeholder="Email" />
    <input name="website" defaultValue={profile.website ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Website" />
    <input
  name="address"
  defaultValue={profile.address ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Address"
/>
  </div>

  <h2 className="text-2xl font-semibold mb-4 text-white">
    About Me
  </h2>

  <textarea
    name="aboutMe" defaultValue={profile.aboutMe ?? ""}
    rows={5}
    className="w-full bg-black border border-gray-700 rounded p-3 mb-8"
  />

  <h2 className="text-2xl font-semibold mb-4 text-white">
    Social Links
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <input
  name="facebook"
  defaultValue={profile.facebook ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Facebook"
/>

<input
  name="pinterest"
  defaultValue={profile.pinterest ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Pinterest"
/>

<input
  name="bluesky"
  defaultValue={profile.bluesky ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Bluesky"
/>

<input
  name="snapchat"
  defaultValue={profile.snapchat ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Snapchat"
/>

<input
  name="googleReviews"
  defaultValue={profile.googleReviews ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Google Reviews"
/>

<input
  name="blogger"
  defaultValue={profile.blogger ?? ""}
  className="bg-black border border-gray-700 rounded p-2"
  placeholder="Blogger"
/>
    <input name="linkedin" defaultValue={profile.linkedin ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="LinkedIn" />
    <input name="github" defaultValue={profile.github ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="GitHub" />
    <input name="instagram" defaultValue={profile.instagram ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Instagram" />
    <input name="youtube" defaultValue={profile.youtube ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="YouTube" />
    <input name="whatsapp" defaultValue={profile.whatsapp ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="WhatsApp" />
    <input name="twitter" defaultValue={profile.twitter ?? ""} className="bg-black border border-gray-700 rounded p-2" placeholder="Twitter/X" />
  </div>

<div className="flex justify-end">
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-medium"
  >
    Save Changes
  </button>
</div>

</form>

</div>

);
}