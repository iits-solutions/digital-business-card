import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

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

<div className="flex gap-4 mb-6">

  <form
    action={async () => {
      "use server";

      await prisma.nfcCard.update({
        where: {
          id: card.id,
        },
        data: {
          status: "ACTIVE",
        },
      });

      revalidatePath(
        `/admin/nfc/${card.id}`
      );
    }}
  >
    <button
      className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl"
    >
      Activate Card
    </button>
  </form>

  <form
    action={async () => {
      "use server";

      await prisma.nfcCard.update({
        where: {
          id: card.id,
        },
        data: {
          status: "INACTIVE",
        },
      });

      revalidatePath(
        `/admin/nfc/${card.id}`
      );
    }}
  >
    <button
      className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
    >
      Deactivate Card
    </button>
  </form>
   <Link
    href={`/admin/nfc/${card.id}/delete`}
    className="bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-xl"
  >
    Delete Card
  </Link>

</div>
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