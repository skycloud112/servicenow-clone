import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryUserGateway } from '@repo/gateways/InMemoryUserGateway';
import { CreateUserUseCase } from '../CreateUserUseCase';

type TestContext = {
  userGateway: InMemoryUserGateway;
  createUseCase: () => CreateUserUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const userGateway = new InMemoryUserGateway();

  const createUseCase = (): CreateUserUseCase => {
    return new CreateUserUseCase(userGateway);
  };

  return {
    userGateway,
    createUseCase,
  };
};

describe('CreateUserUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should create a user with the given details', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createUser({
      email: 'john@example.com',
      displayName: 'John Doe',
      role: 'user',
    });

    expect(response.userId.length).toBeGreaterThan(0);

    const createdUser = await ctx.userGateway.getUser(response.userId);
    expect(createdUser).toBeDefined();
    expect(createdUser!.email).toBe('john@example.com');
    expect(createdUser!.displayName).toBe('John Doe');
    expect(createdUser!.role).toBe('user');
  });

  it('should set createdAt and updatedAt to current time', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createUser({
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'admin',
    });

    const createdUser = await ctx.userGateway.getUser(response.userId);
    expect(createdUser!.createdAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
    expect(createdUser!.updatedAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
  });
});
