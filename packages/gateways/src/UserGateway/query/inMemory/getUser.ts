import type { User } from '@repo/entities/User';
import type { InMemoryUserStore } from '../../inMemoryStores/InMemoryUserStore.js';

export const getUser = async (users: InMemoryUserStore, id: string): Promise<User | undefined> => {
  return users.get(id);
};
