"use client";

import { useEffect, useState } from "react";

export default function LoginBetaNotice() {
  const [open, setOpen] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
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
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center px-4">

      <div className="max-w-xl w-full bg-[#081028] border border-blue-500/30 rounded-3xl p-8">

        <div className="text-center">

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold mb-6">
            PUBLIC BETA
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to iLinq.Team
          </h2>

          <p className="text-gray-300 mb-6">
            iLinq.Team is currently operating in a public beta
            environment. Features and services may change during
            development and testing.
          </p>

          <button
            disabled={countdown > 0}
            onClick={() => setOpen(false)}
            className={`px-8 py-3 rounded-xl font-semibold ${
              countdown > 0
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {countdown > 0
              ? `Continue in ${countdown}s`
              : "Continue to Login"}
          </button>

        </div>

      </div>

    </div>
  );
}