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

  const card =
    await prisma.nfcCard.create({

      data: {
        token,
        userId,
      },

    });

  return card;

}