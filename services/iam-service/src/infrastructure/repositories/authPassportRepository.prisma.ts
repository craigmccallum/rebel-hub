import type { AuthPassport } from '~/domain/aggregates/authPassport/authPassport.aggregate';
import { parseAuthPassport } from '~/domain/aggregates/authPassport/authPassport.aggregate';
import type { AuthPassportRepository } from '~/domain/aggregates/authPassport/authPassport.ports';
import { prisma, type PrismaAuthPassport } from '../database/prisma';

// Mappers
// -------

const toAuthPassport = (prismaAuthPassport: PrismaAuthPassport): AuthPassport =>
  parseAuthPassport(prismaAuthPassport);

const toPersistenceData = (authPassport: AuthPassport): PrismaAuthPassport => {
  parseAuthPassport(authPassport);

  return {
    ...authPassport,
    issuedAt: authPassport.issuedAt.unix(),
    expiresAt: authPassport.expiresAt.unix(),
  };
};

// Repository
// ----------

export const authPassportPrismaRepository: AuthPassportRepository = {
  save: async (authPassport) => {
    const prismaAuthPassport = toPersistenceData(authPassport);
    await prisma.authPassport.upsert({
      where: { id: prismaAuthPassport.id },
      create: prismaAuthPassport,
      update: prismaAuthPassport,
    });
    return authPassport;
  },
  getById: async (id) => {
    const prismaAuthPassport = await prisma.authPassport.findUnique({
      where: { id },
    });
    return prismaAuthPassport ? toAuthPassport(prismaAuthPassport) : null;
  },
  getActiveByUserId: async (userId) => {
    const prismaAuthPassport = await prisma.authPassport.findMany({
      where: { userId, expiresAt: { gt: Date.now() } },
    });
    return prismaAuthPassport.map(toAuthPassport);
  },
};
