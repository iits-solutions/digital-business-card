import { prisma } from "@/lib/prisma";
import QRCode from "react-qr-code";
import Image from "next/image";
export default async function BusinessProfileQRPage({
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
        
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
{profile.profileImage && (
  <div className="mb-6 flex justify-center">
    <Image
      src={profile.profileImage}
      alt={profile.companyName}
      width={120}
      height={120}
      className="rounded-xl border border-white/10"
    />
  </div>
)}
      <h1 className="text-3xl font-bold text-center">
        {profile.companyName}
      </h1>

      <p className="mt-2 text-gray-400 text-center">
        {profile.jobTitle}
      </p>

      <p className="text-gray-500 text-center">
        {profile.city}, {profile.country}
      </p>

<div className="mt-8">

  <p className="text-sm text-gray-400">
    QR Target URL
  </p>

  <div className="mt-2 bg-[#081028] border border-white/10 rounded-lg p-3 text-blue-400 break-all">
    https://www.ilinq.team/p/{profile.slug}
  </div>

</div>

<div className="mt-8 flex justify-center">

  <div className="inline-block bg-white p-4 rounded-xl shadow-lg">
    <QRCode
      value={`https://www.ilinq.team/p/${profile.slug}`}
      size={220}
    />
  </div>

</div>

    </div>
  );
}