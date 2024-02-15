import { describe, expect, it } from '@jest/globals';

import { InvalidAggregateError } from '@rebel-hub/service-tools';
import { User } from '~/domain/aggregates/user/user.aggregate';
import { createFakeUser } from '~/domain/aggregates/user/user.utils';
import { createInMemoryUserRepository } from './userRepository.inMemory';
import { userPrismaRepository } from './userRepository.prisma';

const reposToTest = [
  {
    repositoryName: 'In Memory',
    userRepository: createInMemoryUserRepository(),
  },
  {
    repositoryName: 'Prisma',
    userRepository: userPrismaRepository,
  },
];

reposToTest.forEach(({ repositoryName, userRepository }) => {
  describe(`${repositoryName} user repository`, () => {
    describe('save', () => {
      it('should save a new User', async () => {
        // Arrange
        // -------
        const USER = createFakeUser();

        // Act
        // ---
        const createdUser = await userRepository.save(USER);

        // Assert
        // ------
        expect(createdUser).toEqual(USER);
      });
      it('should throw an error if the User is invalid', async () => {
        // Arrange
        // -------
        const User = {} as User;

        // Act / Assert
        // ------------
        expect(async () => userRepository.save(User)).rejects.toThrowError(InvalidAggregateError);
      });
    });
    describe('update', () => {
      it('should save updates to a User', async () => {
        // Arrange
        // -------
        const USER = createFakeUser();
        await userRepository.save(USER);

        // Act
        // ---
        const updatedUser = await userRepository.save({
          ...USER,
          state: 'deactivated',
        });

        // Assert
        // ------
        expect(updatedUser).toEqual({
          ...USER,
          status: 'Awaiting First Signature',
        });
      });
      it('should throw an error if the User updates are invalid', async () => {
        // Arrange
        // -------
        const User = createFakeUser();
        await userRepository.save(User);

        // Act / Assert
        // ------------
        expect(async () =>
          userRepository.save({
            ...User,
            state: 'NOT_VALID',
          } as any),
        ).rejects.toThrowError(InvalidAggregateError);
      });
    });
    describe('getById', () => {
      it('should retrieve a User given its ID', async () => {
        // Arrange
        // -------
        const User = createFakeUser();
        await userRepository.save(User);

        // Act
        // ---
        const account = await userRepository.getById(User.id);

        // Assert
        // ------
        expect(account).toEqual(User);
      });
    });
  });
});
