import type { AuthPassport } from '~/domain/aggregates/authPassport/authPassport.aggregate';
import type { AuthPassportRepository } from '~/domain/aggregates/authPassport/authPassport.ports';

export const createInMemoryAuthPassportRepository = (): AuthPassportRepository => {
  const authPassportStore: AuthPassport[] = [];

  return {
    save: async (authPassport) => {
      authPassportStore.push(authPassport);
      return authPassport;
    },
    getById: async (id) => {
      const authPassport = authPassportStore.find((authPassport) => authPassport.id === id);
      return authPassport ?? null;
    },
    getActiveByUserId: async (userId) => {
      const authPassports = authPassportStore.filter(
        (authPassport) => authPassport.userId === userId,
      );
      return authPassports;
    },
  };
};
