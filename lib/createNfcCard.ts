import { prisma } from "@/lib/prisma";

import { generateToken } from "@/lib/generateToken";

export async function createNfcCard(userId: string) {

  const token = generateToken();

  const card = await prisma.nfcCard.create({
    data: {
      token,
      userId,
    },
  });

  return card;

}