import { prisma } from "@/lib/prisma";
import QRCode from "react-qr-code";

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
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold">
        {profile.companyName}
      </h1>

      <p className="mt-2 text-gray-400">
        {profile.jobTitle}
      </p>

      <p className="text-gray-500">
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

  <QRCode
    value={`https://www.ilinq.team/p/${profile.slug}`}
    size={220}
  />

</div>

    </div>
  );
}