import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'john_doe@example.com' },
    update: {},
    create: {
      email: 'john_doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
      role: 'ADMIN',
      isMember: true,
    },
  });

  // Create staff user
  const staff = await prisma.user.upsert({
    where: { email: 'jane_doe@example.com' },
    update: {},
    create: {
      email: 'jane_doe@example.com',
      name: 'Jane Doe',
      password: hashedPassword,
      role: 'STAFF',
      isMember: true,
    },
  });

  // Create regular user
  const regular = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  const member = await prisma.user.upsert({
    where: { email: 'member@example.com' },
    update: {},
    create: {
      email: 'member@example.com',
      name: 'Member User',
      password: hashedPassword,
      role: 'USER',
      isMember: true,
    },
  });

  console.log('Admin user created:', admin.email);
  console.log('Staff user created:', staff.email);
  console.log('Regular user created:', regular.email);
  console.log('Member user created:', member.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
