"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
 Globe,
  MessageCircle,
  } from "lucide-react";
type Props = {
  profile: any;
  fullName: string;
};

export default function CompactTemplate({
  profile,
  fullName,
}: Props) {

const [showExchange, setShowExchange] = useState(false);

const [visitorName, setVisitorName] = useState("");
const [visitorCompany, setVisitorCompany] = useState("");
const [visitorEmail, setVisitorEmail] = useState("");
const [visitorPhone, setVisitorPhone] = useState("");
const [visitorMessage, setVisitorMessage] = useState("");

const [showSuccess, setShowSuccess] = useState(false);

const timerRef = useRef<NodeJS.Timeout | null>(null);
const openedManually = useRef(false);

  useEffect(() => {
  timerRef.current = setTimeout(() => {
    if (!openedManually.current) {
      setShowExchange(true);
    }
  }, 8000);

  return () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
}, []);
async function submitLead() {
  const response = await fetch("/api/leads/exchange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessProfileId: profile.id,
      name: visitorName,
      company: visitorCompany,
      email: visitorEmail,
      phone: visitorPhone,
      message: visitorMessage,
    }),
  });

  if (response.ok) {
    setShowExchange(false);
    setShowSuccess(true);
setTimeout(() => {
  setShowSuccess(false);
}, 5000);
    setVisitorName("");
    setVisitorCompany("");
    setVisitorEmail("");
    setVisitorPhone("");
    setVisitorMessage("");
  } else {
    alert("Something went wrong. Please try again.");
  }
}
  return (
    <main className="min-h-screen bg-[#e8f5e9] flex justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl">

  {/* Banner */}
  <div className="relative h-44">

    {profile.backgroundImage ? (
      <img
        src={profile.backgroundImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-r from-blue-700 to-cyan-500" />
    )}

  </div>
{/* Profile Image */}
<div className="relative -mt-28 px-6">
  <img
    src={profile.profileImage || "/default-avatar.png"}
    alt={fullName}
    className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-xl"
  />
</div>
{/* Profile Information */}
<div className="px-6 mt-4">

  <h1 className="text-3xl font-bold text-black">
    {fullName}
  </h1>

  <p className="text-blue-600 font-medium mt-1">
    @{profile.slug}
  </p>

  <p className="text-gray-700 mt-2">
    {profile.jobTitle}
  </p>

  <p className="text-gray-500">
    {profile.companyName}
  </p>
  <div className="h-6"></div>
  {/* About Me */}
<div className="mt-8">

  <h2 className="text-xl font-bold mb-3">
    About Me
  </h2>

  <div className="bg-gray-100 rounded-2xl p-4">

    <p className="text-gray-700">
      {profile.aboutMe || "Welcome to my Digital Business Card."}
    </p>
  </div>
</div>
  <div className="mt-4"></div>
 <button
  onClick={() => {
  openedManually.current = true;

  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  setShowExchange(true);
}}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
>
  🔄 Exchange Information
</button>
<div className="mt-4">
 <a
  href={`/api/business-vcard/${profile.id}`}
  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-center"
>
  💾 Save Contact
</a>
</div>
{/* Connect With Me */}
<div className="mt-8">

  <h2 className="text-2xl font-bold text-center mb-5">
    Connect With Me
  </h2>

  <div className="grid grid-cols-4 gap-4">

  <a
  href={`https://wa.me/${profile.whatsapp}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-600 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <MessageCircle size={26} />
  <span className="text-xs mt-2">WhatsApp</span>
</a>

  <a
  href={`tel:${profile.primaryPhone}`}
  className="bg-blue-600 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <Phone size={26} />
  <span className="text-xs mt-2">Call</span>
</a>

  <a
  href={`mailto:${profile.email}`}
  className="bg-red-600 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <Mail size={26} />
  <span className="text-xs mt-2">Email</span>
</a>  

  <a
  href={profile.website || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gray-800 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <Globe size={26} />
  <span className="text-xs mt-2">Website</span>
</a>

  <a
  href={profile.linkedin || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-700 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <span className="text-2xl font-bold">in</span>
  <span className="text-xs mt-2">LinkedIn</span>
</a>

  <a
  href={profile.instagram || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-pink-600 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <span className="text-2xl">📷</span>
  <span className="text-xs mt-1">Instagram</span>
</a>

  <a
  href={profile.facebook || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-blue-500 h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <span className="text-2xl font-bold">f</span>
  <span className="text-xs mt-1">Facebook</span>
</a>

  <a
  href={profile.twitter || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black h-22 rounded-2xl text-white flex flex-col items-center justify-center"
>
  <span className="text-2xl font-bold">𝕏</span>
  <span className="text-xs mt-1">X</span>
</a>

</div>

</div>
</div>

</div>

{showExchange && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md">

      <h2 className="text-2xl font-bold text-black mb-4">
        Exchange Information
      </h2>

      <input
  type="text"
  value={visitorName}
  onChange={(e) => setVisitorName(e.target.value)}
  placeholder="Your Name"
  className="w-full border rounded-lg p-3 mb-3 text-black"
/>

      <input
  type="text"
  value={visitorCompany}
  onChange={(e) => setVisitorCompany(e.target.value)}
  placeholder="Your Company"
  className="w-full border rounded-lg p-3 mb-3 text-black"
/>

      <input
  type="email"
  value={visitorEmail}
  onChange={(e) => setVisitorEmail(e.target.value)}
  placeholder="Your Email"
  className="w-full border rounded-lg p-3 mb-3 text-black"
/>

      <input
  type="text"
  value={visitorPhone}
  onChange={(e) => setVisitorPhone(e.target.value)}
  placeholder="Phone Number"
  className="w-full border rounded-lg p-3 mb-5 text-black"
/>

      <textarea
  value={visitorMessage}
  onChange={(e) => setVisitorMessage(e.target.value)}
  placeholder="How may I help you?"
  rows={4}
  className="w-full border rounded-lg p-3 mb-5 text-black resize-none"
/>

      <div className="flex gap-3">

        <button
          onClick={() => setShowExchange(false)}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={submitLead}
  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
>
  Send
</button>

      </div>

    </div>
  </div>
)}

{showSuccess && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[90%] max-w-sm text-center">

      <div className="flex justify-center mb-5">
  <img
    src={profile.companyLogo || "/logo.png"}
    alt="Company Logo"
    className="w-24 h-24 object-contain"
  />
</div>

      <h2 className="text-2xl font-bold text-black">
        Thank You!
      </h2>

      <p className="text-gray-600 mt-3">
        Your information has been shared successfully.
      </p>

      <p className="text-gray-500 text-sm mt-2">
  {profile.companyName} will contact you shortly.
</p>

      <button
        onClick={() => setShowSuccess(false)}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
      >
        Close
      </button>

    </div>
  </div>
)}

    </main>
  );
}