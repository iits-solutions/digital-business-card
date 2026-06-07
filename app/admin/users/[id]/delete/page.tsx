import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return (
      <div className="text-white p-10">
        User not found.
      </div>
    );
  }

  async function deleteUser() {
  "use server";

  try {
    await prisma.profile.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.analytics.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.lead.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.activity.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.account.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.nfcCard.deleteMany({
      where: {
        userId: user!.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: user!.id,
      },
    });

    redirect("/admin/users");

  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    throw error;
  }
}

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <div className="bg-[#081028] border border-red-700 rounded-3xl p-10 max-w-2xl w-full">

        <h1 className="text-4xl font-bold text-red-500 mb-6">
          Delete User
        </h1>

        <p className="text-xl mb-4">
          Are you sure you want to permanently delete:
        </p>

        <div className="bg-black/30 rounded-xl p-4 mb-6">
          <p>
            <strong>Name:</strong>{" "}
            {user.profile?.fullName || "Unknown"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>
        </div>

        <div className="bg-red-950 border border-red-700 rounded-xl p-4 mb-8">
          <p>
            ⚠ This action cannot be undone.
          </p>

          <p>
            The user account, profile, sessions,
            analytics, leads and NFC assignments
            will be permanently removed.
          </p>
        </div>

        <form action={deleteUser}>
          <button
            className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-xl font-bold"
          >
            DELETE USER
          </button>
        </form>

      </div>

    </main>
  );
}