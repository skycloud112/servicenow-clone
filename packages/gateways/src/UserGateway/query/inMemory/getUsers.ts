import type { User } from '@repo/entities/User';
import type { InMemoryUserStore } from '../../inMemoryStores/InMemoryUserStore';

export const getUsers = async (users: InMemoryUserStore): Promise<User[]> => {
  const result = Array.from(users.values());
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
