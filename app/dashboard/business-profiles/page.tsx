import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function BusinessProfilesPage() {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        businessProfiles: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  return (
    <div className="p-6 text-white">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Professional Profiles
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your Professional identities.
          </p>
        </div>

        <Link
          href="/dashboard/business-profiles/new"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Create Professional Profile
        </Link>
      </div>

      <div className="grid gap-4">

        {user?.businessProfiles.length ? (

          user.businessProfiles.map((profile) => (

            <div
              key={profile.id}
              className="bg-[#081028] border border-white/10 rounded-xl p-5"
            >
              <h2 className="text-xl font-bold">
                {profile.companyName}
              </h2>

              <p className="text-gray-400">
                {profile.jobTitle}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {profile.city}, {profile.country}
              </p>

             <div className="mt-4 flex flex-wrap gap-2">

  <Link
    href={`/dashboard/business-profiles/${profile.id}`}
    className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 text-white px-3 py-1 rounded-lg text-sm"
  >
    Edit
  </Link>

  <Link
    href={`/dashboard/business-profiles/${profile.id}/view`}
    className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 text-white px-3 py-1 rounded-lg text-sm"
  >
    View
  </Link>

  <Link
    href={`/dashboard/business-profiles/${profile.id}/templates`}
    className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 text-white px-3 py-1 rounded-lg text-sm"
  >
    Template ▼
  </Link>

  <Link
    href={`/dashboard/business-profiles/${profile.id}/qr`}
    className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 text-white px-3 py-1 rounded-lg text-sm"
  >
    QR
  </Link>

  <Link
    href={`/dashboard/business-profiles/${profile.id}/nfc`}
    className="bg-[#111827] hover:bg-[#1f2937] border border-white/10 text-white px-3 py-1 rounded-lg text-sm"
  >
    NFC
  </Link>

</div>
            </div>

          ))

        ) : (

          <div className="bg-[#081028] border border-white/10 rounded-xl p-6 text-gray-400">
            No Professional Profile Yet
          </div>

        )}

      </div>

    </div>
  );
}