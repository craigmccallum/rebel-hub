import type { User } from '~/domain/aggregates/user/user.aggregate';
import type { UserRepository } from '~/domain/aggregates/user/user.ports';

export const createInMemoryUserRepository = (): UserRepository => {
  const userStore: User[] = [];

  return {
    save: async (user) => {
      userStore.push(user);
      return user;
    },
    getById: async (id) => {
      const user = userStore.find((user) => user.id === id);
      return user ?? null;
    },
    getByEmail: async (email) => {
      const user = userStore.find((user) => user.email === email);
      return user ?? null;
    },
    getByPhoneNumber: async (phoneNumber) => {
      const user = userStore.find((user) => user.phoneNumber === phoneNumber);
      return user ?? null;
    },
  };
};
