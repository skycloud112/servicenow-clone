import { User } from '@repo/entities/User';
import type { InMemoryUserStore } from '../../inMemoryStores/InMemoryUserStore.js';

export const createUser = async (users: InMemoryUserStore, user: User): Promise<void> => {
  const cloned = new User(
    user.id,
    user.email,
    user.displayName,
    user.role,
    user.createdAt,
    user.updatedAt,
  );
  users.set(cloned.id, cloned);
};
