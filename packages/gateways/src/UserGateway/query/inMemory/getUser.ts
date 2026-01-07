import type { User } from '@repo/entities/User';
import type { InMemoryUserStore } from '../../inMemoryStores/InMemoryUserStore';

export const getUser = async (users: InMemoryUserStore, id: string): Promise<User | undefined> => {
  return users.get(id);
};
