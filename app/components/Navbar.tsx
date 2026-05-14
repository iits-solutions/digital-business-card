export default function Navbar() {
  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">
        ILinq
      </h1>

      <div className="flex gap-5 text-gray-300">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Login</a>
        <a href="#">Signup</a>
      </div>
    </nav>
  );
}