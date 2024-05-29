import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {

  console.log('Done Seeding...');
}

main()
  .catch((e) => {
    console.log('error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
