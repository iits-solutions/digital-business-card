import { prisma } from "@/lib/prisma";

export default async function AdminNfcPage() {
  const cards = await prisma.nfcCard.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        NFC Management
      </h1>

      <div className="space-y-4">
        {cards.map((card) => (
          <div
  key={card.id}
  className="bg-[#081028] rounded-2xl p-6 border border-white/10"
>
  <div className="grid md:grid-cols-5 gap-4">

    <div>
      <p className="text-gray-500 text-sm">
        User
      </p>

      <p className="font-semibold">
        {card.user.email}
      </p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">
        Plan
      </p>

      <p>{card.plan}</p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">
        Status
      </p>

      <p
        className={
          card.status === "ACTIVE"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {card.status}
      </p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">
        Expires
      </p>

      <p>
        {card.expiresAt
          ? new Date(
              card.expiresAt
            ).toLocaleDateString()
          : "Never"}
      </p>
    </div>

    <div>
      <a
        href={`/admin/nfc/${card.id}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Manage Card
      </a>
    </div>

  </div>
</div>
        ))}
      </div>
    </main>
  );
}