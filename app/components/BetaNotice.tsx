"use client";

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
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-[#081028] border border-blue-500/30 rounded-3xl p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-5xl mb-4">
            🚧
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to iLinq.Team
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            iLinq.Team is currently in active development and
            public beta testing.
            Features, subscriptions, integrations and services
            may be modified, unavailable or changed without
            prior notice.
          </p>

          <p className="text-gray-400 text-sm mb-6">
            Please do not rely on the platform for critical
            business operations or commercial transactions
            until the official public release.
          </p>

          <label className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={dontShow}
              onChange={(e) =>
                setDontShow(e.target.checked)
              }
            />
            Don't show again on this device
          </label>

          <button
            disabled={countdown > 0}
            onClick={handleContinue}
            className={`px-8 py-3 rounded-xl font-semibold transition ${
              countdown > 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {countdown > 0
              ? `Continue in ${countdown}s`
              : "Continue to iLinq"}
          </button>

        </div>

      </div>
    </div>
  );
}