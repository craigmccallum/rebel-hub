import { PrismaClient, type AuthPassport, type User } from '@prisma/client';

export const prisma = new PrismaClient();

export type PrismaUser = User;
export type PrismaAuthPassport = AuthPassport;
