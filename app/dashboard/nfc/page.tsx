export default function NFCPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">
          NFC Card Management
        </h1>

        <p className="text-gray-400">
          Manage your smart NFC business cards
        </p>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* NFC Card Preview */}
        <div className="bg-[#111827] border border-white/10 rounded-3xl p-10">

          <h2 className="text-2xl font-semibold mb-8">
            NFC Business Card
          </h2>

          {/* NFC Card */}
          <div className="relative h-64 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 flex flex-col justify-between shadow-2xl">

            <div className="flex items-center justify-between">

              <h3 className="text-3xl font-bold">
                ILinq
              </h3>

              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                NFC
              </div>

            </div>

            <div>

              <h4 className="text-3xl font-semibold">
                Imran Akram
              </h4>

              <p className="text-white/80 mt-2">
                Founder & CEO
              </p>

            </div>

          </div>

          {/* Status */}
          <div className="mt-8 flex items-center justify-between bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-5">

            <div>

              <p className="text-gray-400 text-sm">
                Card Status
              </p>

              <h4 className="text-xl font-semibold mt-1">
                Connected
              </h4>

            </div>

            <div className="w-4 h-4 rounded-full bg-green-500"></div>

          </div>

        </div>

        {/* NFC Actions */}
        <div className="bg-[#111827] border border-white/10 rounded-3xl p-10">

          <h2 className="text-2xl font-semibold mb-8">
            NFC Actions
          </h2>

          <div className="space-y-6">

            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-3">
                Write Profile to NFC
              </h3>

              <p className="text-gray-400 mb-5">
                Program your NFC card with your ILinq profile URL.
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition">
                Write NFC
              </button>

            </div>

            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-3">
                NFC Scan Analytics
              </h3>

              <p className="text-gray-400 mb-5">
                View NFC tap performance and engagement data.
              </p>

              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition">
                View Analytics
              </button>

            </div>

            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-3">
                Activate New Card
              </h3>

              <p className="text-gray-400 mb-5">
                Connect a new NFC card to your account.
              </p>

              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition">
                Activate Card
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}