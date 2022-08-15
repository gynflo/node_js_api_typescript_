import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "gynflo",
    },
  });

  console.log({ user });
}

run()
.catch((e) => {
  console.log(e);
  process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})
