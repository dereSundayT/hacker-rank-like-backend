import { Prisma, PrismaClient } from '@prisma/client';
import * as process from 'process';
import { hashData } from '../src/_utils/helper.utils';
import { sampleTestData } from './data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start Data Seeding...');
  await prisma.user.deleteMany({});
  await prisma.test.deleteMany({});
  await prisma.userTest.deleteMany({});
  await prisma.userTestDetail.deleteMany({});

  const adminUser: Prisma.UserCreateInput = {
    first_name: 'Admin',
    last_name: 'Admin',
    password: await hashData('admin123'),
    user_role: 'admin',
    email: 'admin@admin.com',
  };

  await prisma.user.create({
    data: adminUser,
  });
  await prisma.test.createMany({ data: sampleTestData });

  //Create Default Test
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
