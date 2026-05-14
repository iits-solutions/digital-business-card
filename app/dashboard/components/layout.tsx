import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex overflow-hidden">
      <Sidebar />

      <section className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <div className="p-8">
          {children}
        </div>
      </section>
    </main>
  );
}