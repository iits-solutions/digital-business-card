import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export default async function TemplateGalleryPage(
  props: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await props.params;

  const profile = await prisma.businessProfile.findUnique({
    where: { id }
  });

  if (!profile) {
    return <div>Profile not found</div>;
  }

  async function applyTemplate(templateId: string) {
  "use server";

  await prisma.businessProfile.update({
  where: {
    id,
  },
  data: {
    templateId,
  },
});

revalidatePath(
  `/dashboard/business-profiles/${id}/templates`
);
}
console.log("PROFILE:", profile);
  return (
    <div className="p-6 text-white">
<Link
  href="/dashboard/business-profiles"
  className="inline-flex items-center mb-4 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg shadow-md"
>
  ← Back to Professional Profiles
</Link>
      <h1 className="text-3xl font-bold mb-6">
        Template Gallery
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#081028] border border-white/10 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-2">
            Classic Business Card
          </h2>

          <p className="text-gray-400 mb-4">
            Original iLinq digital business card.
          </p>

          <div className="flex gap-3">

  <Link
  href={`/dashboard/business-profiles/${profile.id}/view/classic`}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
>
  View
</Link>

  {profile.templateId === "classic-business-card" ? (
  <button className="bg-green-700 px-4 py-2 rounded">
    Selected
  </button>
) : (
  <form
  action={async () => {
    "use server";
    await applyTemplate("classic-business-card");
  }}
>
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
  >
    Apply
  </button>
</form>
)}

</div>
        </div>

        <div className="bg-[#081028] border border-white/10 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-2">
            Professional Corporate
          </h2>

          <p className="text-gray-400 mb-4">
            Banner + Logo + Corporate Profile.
          </p>

          <div className="flex gap-3">

  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
    View
  </button>

  {profile.templateId === "professional-corporate" ? (
  <button className="bg-green-700 px-4 py-2 rounded">
    Selected
  </button>
) : (
  <form
  action={async () => {
    "use server";
    await applyTemplate("professional-corporate");
  }}
>
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
  >
    Apply
  </button>
</form>
)}

</div>
        </div>

        <div className="bg-[#081028] border border-white/10 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-2">
            Compact Mobile Card
          </h2>

          <p className="text-gray-400 mb-4">
            Mobile-first contact card.
          </p>

          <div className="flex gap-3">

  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
    View
  </button>

  {profile.templateId === "compact-mobile-card" ? (
  <button className="bg-green-700 px-4 py-2 rounded">
    Selected
  </button>
) : (
  <form
  action={async () => {
    "use server";
    await applyTemplate("compact-mobile-card");
  }}
>
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
  >
    Apply
  </button>
</form>
)}

</div>
        </div>

      </div>

    </div>
  );
}