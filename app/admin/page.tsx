export default function AdminPage() {

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-4">

          Super Admin Dashboard

        </h1>

        <p className="text-gray-400 text-xl">

          Centralized enterprise management system.

        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 mb-3">

            Total Users

          </p>

          <h2 className="text-5xl font-bold">

            0

          </h2>

        </div>

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 mb-3">

            Active Subscriptions

          </p>

          <h2 className="text-5xl font-bold">

            0

          </h2>

        </div>

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 mb-3">

            Revenue

          </p>

          <h2 className="text-5xl font-bold">

            $0

          </h2>

        </div>

        <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

          <p className="text-gray-400 mb-3">

            Companies

          </p>

          <h2 className="text-5xl font-bold">

            0

          </h2>

        </div>

      </div>

    </div>

  );

}