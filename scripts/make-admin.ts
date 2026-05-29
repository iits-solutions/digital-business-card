import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: {
      email: "iits.solutions.2019@gmail.com",
    },
    data: {
      role: "SUPER_ADMIN",
    },
  });

  console.log("Updated:", user.email, user.role);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });