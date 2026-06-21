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
    alt="iLinq Team"
    width={140}
  height={112}
className="sm:w-[240px] w-[170px] h-auto"
    priority
  />
</div>

        {/* Badge */}
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm my-5 shadow-lg">
          PUBLIC BETA
        </div>

        {/* Heading */}
        <h2 className="text-2xl
            sm:text-4xl font-bold text-white my-5">
                Welcome to iLinq.Team
        </h2>

        {/* Main Text */}
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          iLinq.Team is currently in Public Beta.

• Features may change during testing.
• Some services may be updated without notice.
• Your feedback helps us improve the platform.
        </p>

        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Legal Text */}
        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto my-5">
          By continuing, you acknowledge that you are
          accessing a pre-release version of the platform
          and agree to participate in testing and evaluation
          activities. The platform should not yet be relied
          upon for critical business operations or commercial
          transactions.
        </p>

        {/* Don't Show Again */}
        <label className="flex items-center justify-center gap-3 my-5 text-gray-300">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={(e) =>
              setDontShow(e.target.checked)
            }
            className="h-5 w-5 rounded border-gray-500 accent-blue-600"
          />
          Don't show again on this device
        </label>

        {/* Button */}
        <button
          onClick={handleContinue}
          className="w-full
sm:w-auto
px-8
py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition"
        >
          Continue to iLinq
        </button>

        {/* Version */}
        <div className="mt-8 text-gray-500 text-sm">
          iLinq.Team Beta v1.3
        </div>

      </div>
    </div>
  </div>
);
}