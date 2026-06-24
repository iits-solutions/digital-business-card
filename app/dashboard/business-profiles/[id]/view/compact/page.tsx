export default function CompactMobileCard() {
  return (
    <main className="min-h-screen bg-[#e8f5e9] flex justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[700px]">

        {/* Banner */}
<div className="h-40 relative overflow-hidden">

  <img
    src="https://picsum.photos/600/300"
    alt="Banner"
    className="w-full h-full object-cover"
  />

</div>

       {/* Black Card */}
<div className="bg-black text-white px-5 pb-10 pt-16 relative rounded-b-2xl">

  {/* Profile Image */}
  <div className="absolute -top-10 left-5">
    <img
      src="https://picsum.photos/200"
      alt="Profile"
      className="w-20 h-20 rounded-xl border-4 border-white object-cover"
    />
  </div>

  <h2 className="text-2xl font-bold">
    Imran M. Akram
  </h2>

  <p className="text-sm text-blue-400">
    @imran
  </p>

  <p className="text-sm mt-2">
    Database Administrator
  </p>

  <p className="text-gray-400 text-sm">
    National Water Company
  </p>

</div>

      </div>
    </main>
  );
}