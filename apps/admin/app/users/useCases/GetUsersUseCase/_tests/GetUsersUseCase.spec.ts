import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryUserGateway } from '@repo/gateways/InMemoryUserGateway';
import { createDummyUser } from '@repo/entities/User.testUtils';
import { GetUsersUseCase } from '../GetUsersUseCase';

type TestContext = {
  userGateway: InMemoryUserGateway;
  createUseCase: () => GetUsersUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const userGateway = new InMemoryUserGateway();

  const createUseCase = (): GetUsersUseCase => {
    return new GetUsersUseCase(userGateway);
  };

  return {
    userGateway,
    createUseCase,
  };
};

describe('GetUsersUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should return empty list when no users exist', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.getUsers();

    expect(response.users).toEqual([]);
  });

  it('should return all users as DTOs', async () => {
    const user1 = createDummyUser({ id: '1', email: 'user1@example.com' });
    const user2 = createDummyUser({ id: '2', email: 'user2@example.com' });
    await ctx.userGateway.createUser(user1);
    await ctx.userGateway.createUser(user2);

    const useCase = ctx.createUseCase();
    const response = await useCase.getUsers();

    expect(response.users.length).toBe(2);
  });

  it('should convert dates to ISO strings', async () => {
    const user = createDummyUser({
      id: '1',
      createdAt: new Date('2025-01-15T12:00:00.000Z'),
    });
    await ctx.userGateway.createUser(user);

    const useCase = ctx.createUseCase();
    const response = await useCase.getUsers();

    expect(response.users[0]?.createdAt).toBe('2025-01-15T12:00:00.000Z');
  });
});
