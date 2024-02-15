import type { User } from './user.aggregate';

export type UserRepository = {
  save: (user: User) => Promise<User>;
  getById: (id: User['id']) => Promise<User | null>;
  getByEmail: (email: User['email']) => Promise<User | null>;
  getByPhoneNumber: (phoneNumber: NonNullable<User['phoneNumber']>) => Promise<User | null>;
};
