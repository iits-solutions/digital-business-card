import CopyLinkButton from "@/app/components/sharing/CopyLinkButton";
import ActivateNFCButton from "@/app/components/sharing/ActivateNFCButton";
import PrintQRButton from "@/app/components/sharing/PrintQRButton";
import DownloadQRButton from "@/app/components/sharing/DownloadQRButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getPublicProfileUrl } from "@/lib/url";
import Image from "next/image";
import QRCode from "react-qr-code";
export default async function BusinessProfileSharingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await prisma.businessProfile.findFirst({
  where: {
    id,
  },
  include: {
    user: {
      include: {
        nfcCards: true,
      },
    },
  },
});

  if (!profile) {
    return (
      <div className="p-6 text-white">
        
        Profile not found
      </div>
    );
  }
const nfcCard = profile.user.nfcCards[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 text-white">

      <Link
        href="/dashboard/business-profiles"
        className="inline-flex items-center mb-6 bg-amber-500 hover:bg-amber-600 text-black px-5 py-3 rounded-lg shadow-md font-medium"
      >
        ← Back to Professional Profiles
      </Link>
{profile.profileImage && (
  <div className="mb-8 flex justify-center">
    <Image
      src={profile.profileImage}
      alt={profile.companyName}
      width={120}
      height={120}
      className="rounded-xl border border-white/10"
    />
  </div>
)}
      <div className="text-center mb-6">

  <h1 className="text-3xl font-bold">
    🚀 Digital Sharing Center
  </h1>

  <p className="mt-2 text-gray-400">
    Manage every way to share this professional profile.
  </p>

</div>

<h2 className="mt-6 text-4xl font-bold text-center">
  {profile.companyName}
</h2>

      <p className="mt-3 text-lg text-gray-300 text-center">
        {profile.jobTitle}
      </p>

      <p className="mt-1 text-gray-400 text-center">
        {profile.city}, {profile.country}
      </p>

<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

  <div className="rounded-xl border border-white/10 bg-[#081028] p-6 shadow-lg flex flex-col">
    <h2 className="text-lg font-semibold">
      🌐 Public Profile
    </h2>

    <p className="mt-2 text-gray-400">
      Open or copy your public profile.
    </p>

    <div className="mt-4 bg-[#0d1635] border border-white/10 rounded-lg p-3 text-blue-400 break-all">
      {getPublicProfileUrl(profile.slug)}
    </div>

    <div className="mt-auto pt-6 flex flex-wrap gap-3">

      <Link
        href={getPublicProfileUrl(profile.slug)}
        target="_blank"
        className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2"
      >
        Open Profile
      </Link>

      <CopyLinkButton
  url={getPublicProfileUrl(profile.slug)}
/>

    </div>
  </div>
<div className="rounded-xl border border-white/10 bg-[#081028] p-6 shadow-lg flex flex-col">
  <h2 className="text-lg font-semibold">
    📱 QR Sharing
  </h2>

  <div className="mt-6 flex justify-center">
  <div
  id="profile-qr-code"
  className="bg-white rounded-xl p-5 shadow-md inline-block"
>
    <QRCode
      value={getPublicProfileUrl(profile.slug)}
      size={170}
    />
  </div>
</div>

  <div className="mt-auto pt-6 flex flex-wrap gap-3">

    <DownloadQRButton
  elementId="profile-qr-code"
  fileName={profile.slug}
/>

    <PrintQRButton
  elementId="profile-qr-code"
/>

  </div>
</div>

<div className="rounded-xl border border-white/10 bg-[#081028] p-6 shadow-lg flex flex-col">
  <h2 className="text-lg font-semibold">
    📡 NFC Sharing
  </h2>

  <p className="mt-2 text-gray-400">
    Manage your NFC card assignment.
  </p>

  <div className="mt-5 space-y-2 text-sm">

  <div className="flex justify-between">
    <span className="text-gray-400">Status</span>
    <span className={nfcCard ? "text-green-400" : "text-red-400"}>
      {nfcCard ? "Active" : "Not Assigned"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-400">Card Type</span>
    <span>{nfcCard?.type ?? "-"}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-400">Card Token</span>
    <span>{nfcCard?.token ?? "-"}</span>
  </div>

</div>

  <div className="mt-auto pt-6 flex flex-wrap gap-3">

    <ActivateNFCButton
  profileId={profile.id}
/>

    <button className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2">
      Verify
    </button>

  </div>

</div>

<div className="rounded-xl border border-white/10 bg-[#081028] p-6 shadow-lg flex flex-col">
  <h2 className="text-lg font-semibold">
    👥 Contact Sharing
  </h2>

  <p className="mt-2 text-gray-400">
    Share your contact information.
  </p>

  <div className="mt-5 space-y-2 text-sm">

    <div className="flex justify-between">
      <span className="text-gray-400">VCF Contact</span>
      <span className="text-green-400">Available</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Profile Photo</span>
      <span className="text-green-400">Embedded</span>
    </div>

  </div>

  <div className="mt-auto pt-6 flex flex-wrap gap-3">

    <Link
  href={`/api/business-vcard/${profile.id}`}
  className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2"
>
  Download VCF
</Link>

    <button className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2">
      Save Contact
    </button>

  </div>

</div>

</div>

    </div>
  );
}