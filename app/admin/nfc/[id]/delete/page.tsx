import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteCardPage({
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

  async function deleteCard() {
    "use server";

    await prisma.nfcCard.delete({
      where: {
        id: id,
      },
    });

    redirect("/admin/nfc");
  }

  return (
    <main className="p-8 text-white">

      <h1 className="text-4xl font-bold text-red-500 mb-8">
        Delete NFC Card
      </h1>

      <div className="bg-[#081028] rounded-3xl p-8 border border-red-500">

        <p className="mb-2">
          <strong>User:</strong> {card.user.email}
        </p>

        <p className="mb-2">
          <strong>Token:</strong> {card.token}
        </p>

        <p className="mb-8">
          <strong>Status:</strong> {card.status}
        </p>

        <div className="bg-red-900/40 border border-red-500 rounded-xl p-4 mb-6">
          This action cannot be undone.
          The NFC card will be permanently removed.
        </div>

        <form action={deleteCard}>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl">
            DELETE CARD
          </button>
        </form>

      </div>

    </main>
  );
}