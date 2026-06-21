"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

export default function BetaNotice() {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(
      "ilinq_beta_notice"
    );

    if (!accepted) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const handleContinue = () => {
    if (dontShow) {
      localStorage.setItem(
        "ilinq_beta_notice",
        "accepted"
      );
    }

    setOpen(false);
  };

  if (!open) return null;

return (
  <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center px-4">
    <div className="
w-full
max-w-xl
mx-auto
bg-[#081028]
border border-blue-500/40
rounded-3xl
px-5
py-6
sm:px-8
sm:py-8
shadow-[0_0_40px_rgba(37,99,235,0.25)]
max-h-[90vh]
overflow-y-auto
">

      <div className="text-center">

        {/* Logo */}
        <div className="flex justify-center mb-3">
  <Image
  src="/iLinq-Logo.png"
  alt="iLinq.Team"
  width={120}
  height={96}
  priority
  className="w-[120px] sm:w-[170px] md:w-[210px] h-auto mx-auto"
/>
</div>

        {/* Badge */}
        <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm mb-5 shadow-lg">
          PUBLIC BETA
        </div>

        {/* Heading */}
        <h2 className="text-2xl
            sm:text-4xl font-bold text-white my-5">
                Welcome to iLinq.Team
        </h2>

        {/* Main Text */}
<div className="text-gray-300 text-base sm:text-lg leading-7 max-w-md mx-auto mb-6">

  <p className="mb-5">
    Thank you for trying the <strong>iLinq.Team Public Beta</strong>.
  </p>

  <div className="space-y-3 text-left inline-block">
    <div>✅ Features are still being improved.</div>
    <div>✅ Updates may occur during testing.</div>
    <div>✅ Your feedback helps us build a better platform.</div>
  </div>

</div>

<div className="w-full h-px bg-white/10 my-5"></div>

{/* Don't Show Again */}
<label className="flex items-center justify-center gap-3 mb-6 text-gray-300 text-sm sm:text-base">
  <input
    type="checkbox"
    checked={dontShow}
    onChange={(e) => setDontShow(e.target.checked)}
    className="h-5 w-5 rounded accent-blue-600"
  />
  Don't show again on this device
</label>

{/* Button */}
<button
  onClick={handleContinue}
  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition"
>
  Continue to iLinq
</button>

        {/* Version */}
        <div className="mt-8 text-gray-500 text-sm">
          iLinq.Team Beta v1.4
        </div>

      </div>
    </div>
  </div>
);
}