"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">

      {/* Mobile Header */}
      <header className="lg:hidden h-16 sticky top-0 z-30 border-b border-white/10 bg-[#081028] flex items-center justify-between px-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white"
        >
          <Menu size={28} />
        </button>

        <div className="flex items-center gap-2">
  <img
    src="/iLinq-Logo.png"
    alt="iLinq.Team"
    className="w-8 h-8"
  />
  <span className="text-white font-bold text-lg">
    iLinq.Team
  </span>
</div>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-[#111827] flex items-center justify-center">
  <span className="text-white text-sm font-semibold">
    U
  </span>
</div>

      </header>

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out w-80 lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="relative">

          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-4 text-white"
          >
            <X size={24} />
          </button>

          <Sidebar />

        </div>

      </div>

    </div>
  );
}