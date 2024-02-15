import type { User } from '~/domain/aggregates/user/user.aggregate';
import { parseUser } from '~/domain/aggregates/user/user.aggregate';
import type { UserRepository } from '~/domain/aggregates/user/user.ports';
import type { PrismaUser } from '../database/prisma';
import { prisma } from '../database/prisma';

// Mappers
// -------

const toUser = (prismaUser: PrismaUser): User => parseUser(prismaUser);

const toPersistenceData = (user: User): PrismaUser => parseUser(user);

// Repository
// ----------

export const userPrismaRepository: UserRepository = {
  save: async (user) => {
    const prismaUser = toPersistenceData(user);
    await prisma.user.upsert({
      where: { id: prismaUser.id },
      create: prismaUser,
      update: prismaUser,
    });
    return user;
  },
  getById: async (id) => {
    const prismaUser = await prisma.user.findUnique({
      where: { id },
    });
    return prismaUser ? toUser(prismaUser) : null;
  },
  getByEmail: async (email) => {
    const prismaUser = await prisma.user.findUnique({
      where: { email },
    });
    return prismaUser ? toUser(prismaUser) : null;
  },
  getByPhoneNumber: async (phoneNumber) => {
    const prismaUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    return prismaUser ? toUser(prismaUser) : null;
  },
};
