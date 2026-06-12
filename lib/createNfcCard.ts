import { prisma } from "@/lib/prisma";

import { generateToken } from "@/lib/generateToken";

export async function createNfcCard(userId: string) {

  // CHECK EXISTING CARD
  const existingCard =
    await prisma.nfcCard.findFirst({

      where: {
        userId,
      },
      
    });
    

  // RETURN EXISTING
  if (existingCard) {
    return existingCard;
  }

  // CREATE NEW CARD
  const token =
    generateToken();

  const user = await prisma.user.findUnique({
  where: {
    id: userId,
  },
});
if (!user) {
  throw new Error("User not found");
}
const card =
  await prisma.nfcCard.create({
    data: {
      token,
      userId,

      plan: user?.plan || "FREE",

      status:
        user?.subscriptionStatus === "ACTIVE"
          ? "ACTIVE"
          : "INACTIVE",
    },
  });

  return card;

}