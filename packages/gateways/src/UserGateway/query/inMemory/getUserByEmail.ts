import type { User } from '@repo/entities/User';
import type { InMemoryUserStore } from '../../inMemoryStores/InMemoryUserStore';

export const getUserByEmail = async (
  users: InMemoryUserStore,
  email: string,
): Promise<User | undefined> => {
  return Array.from(users.values()).find((u) => u.email === email);
};
