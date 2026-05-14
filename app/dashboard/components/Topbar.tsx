export default function Topbar() {
  return (
    <header className="h-20 border-b border-white/10 bg-[#111827] flex items-center justify-between px-8">

      <div>
        <h2 className="text-3xl font-semibold">
          Dashboard
        </h2>

        <p className="text-gray-400 mt-1">
          Welcome back to ILinq
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-medium transition">
          Upgrade
        </button>

        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center font-bold text-lg">
          I
        </div>

      </div>

    </header>
  );
}