import { User, UserRole } from './User.js';

export type CreateDummyUserParams = {
  id?: string;
  email?: string;
  displayName?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
};

export const createDummyUser = (params: CreateDummyUserParams = {}): User => {
  const now = new Date();
  return new User(
    params.id ?? '1',
    params.email ?? 'test@example.com',
    params.displayName ?? 'Test User',
    params.role ?? 'user',
    params.createdAt ?? now,
    params.updatedAt ?? now,
  );
};
