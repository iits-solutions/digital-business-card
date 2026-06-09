import { prisma } from "@/lib/prisma";

export default async function NfcDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const card = await prisma.nfcCard.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!card) {
    return (
      <div className="p-8 text-white">
        Card not found
      </div>
    );
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        NFC Card Details
      </h1>

      <div className="bg-[#081028] rounded-3xl p-8 border border-white/10">

        <p>
          <strong>User:</strong>{" "}
          {card.user.email}
        </p>

        <p>
          <strong>Plan:</strong>{" "}
          {card.plan}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {card.status}
        </p>

        <p>
          <strong>Token:</strong>{" "}
          {card.token}
        </p>

        <p>
          <strong>Type:</strong>{" "}
          {card.type}
        </p>

      </div>
    </main>
  );
}