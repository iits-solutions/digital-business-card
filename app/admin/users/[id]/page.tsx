import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

const { id } = await params;

const userId = id;

console.log("PARAM ID:", userId);

const user = await prisma.user.findFirst({
where: {
id: userId,
},
include: {
nfcCards: true,
},
});

if (!user) {
return ( <div className="text-white text-2xl">
User not found. </div>
);
}

const activeCard = user.nfcCards?.[0];

async function assignPlan(
plan: string,
status: string = "ACTIVE"
) {


"use server";

const expiresAt = new Date();

expiresAt.setFullYear(
  expiresAt.getFullYear() + 1
);

const card =
  await prisma.nfcCard.findFirst({
    where: {
      userId: user.id,
    },
  });

if (card) {

  await prisma.nfcCard.update({
    where: {
      id: card.id,
    },
    data: {
      plan,
      status,
      expiresAt,
    },
  });

} else {

  await prisma.nfcCard.create({
    data: {
      token: crypto.randomUUID(),
      userId: user.id,
      plan,
      status,
      expiresAt,
    },
  });

}

revalidatePath(`/admin/users/${user.id}`);


}

return ( <div className="space-y-8">


  <div>

    <h1 className="text-5xl font-bold mb-4">
      User Details
    </h1>

    <div className="text-yellow-400 mb-4">
      User ID: {user.id}
    </div>

    <p className="text-gray-400 text-xl">
      Centralized customer profile management.
    </p>

  </div>

  <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

    <div className="flex flex-wrap gap-3 mb-8">

      <form action={assignPlan.bind(null, "STARTER")}>
        <button
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          Starter
        </button>
      </form>

      <form action={assignPlan.bind(null, "PRO")}>
        <button
          className="bg-purple-600 px-4 py-2 rounded-xl"
        >
          Pro
        </button>
      </form>

      <form action={assignPlan.bind(null, "PREMIUM")}>
        <button
          className="bg-green-600 px-4 py-2 rounded-xl"
        >
          Premium
        </button>
      </form>

      <form
        action={assignPlan.bind(
          null,
          "FREE",
          "INACTIVE"
        )}
      >
        <button
          className="bg-red-600 px-4 py-2 rounded-xl"
        >
          Deactivate
        </button>
      </form>

    </div>

    <div className="grid md:grid-cols-2 gap-8">

      <div>
        <p className="text-gray-500 mb-2">
          Name
        </p>

        <h2 className="text-3xl font-bold">
          {user.name || "Unknown"}
        </h2>
      </div>

      <div>
        <p className="text-gray-500 mb-2">
          Email
        </p>

        <h2 className="text-2xl">
          {user.email}
        </h2>
      </div>

      <div>
        <p className="text-gray-500 mb-2">
          Current Plan
        </p>

        <h2 className="text-2xl">
          {activeCard?.plan || "FREE"}
        </h2>
      </div>

      <div>
        <p className="text-gray-500 mb-2">
          Status
        </p>

        <h2
          className={
            activeCard?.status === "ACTIVE"
              ? "text-green-400 text-2xl"
              : "text-red-400 text-2xl"
          }
        >
          {activeCard?.status || "INACTIVE"}
        </h2>
      </div>

    </div>

  </div>

  <div className="bg-[#081028] border border-white/10 rounded-3xl p-8">

    <h2 className="text-3xl font-bold mb-6">
      NFC Cards
    </h2>

    <div className="space-y-4">

      {user.nfcCards.length ? (

        user.nfcCards.map((card) => (

          <div
            key={card.id}
            className="bg-black/30 rounded-2xl p-5 border border-white/10"
          >

            <div className="grid md:grid-cols-4 gap-4">

              <div>
                <p className="text-gray-500 text-sm">
                  Card ID
                </p>
                <p>{card.id}</p>
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
                    : "N/A"}
                </p>
              </div>

            </div>

          </div>

        ))

      ) : (

        <div className="text-gray-400">
          No NFC cards found.
        </div>

      )}

    </div>

  </div>

</div>


);
}
