import { type AuthPassport } from './authPassport.aggregate';

export type AuthPassportRepository = {
  save: (authPassport: AuthPassport) => Promise<AuthPassport>;
  getById: (id: AuthPassport['id']) => Promise<AuthPassport | null>;
  getActiveByUserId: (userId: AuthPassport['userId']) => Promise<AuthPassport[]>;
};
