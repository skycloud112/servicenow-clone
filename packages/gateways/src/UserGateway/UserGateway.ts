import type { User } from '@repo/entities/User';

export interface UserGateway {
  createUser(user: User): Promise<void>;
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  updateUser(user: User): Promise<void>;
}
