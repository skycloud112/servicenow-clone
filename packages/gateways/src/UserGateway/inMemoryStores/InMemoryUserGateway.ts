import type { User } from '@repo/entities/User';
import type { UserGateway } from '../UserGateway';
import type { InMemoryUserStore } from './InMemoryUserStore';
import { createUser } from '../command/inMemory/createUser';
import { updateUser } from '../command/inMemory/updateUser';
import { getUser } from '../query/inMemory/getUser';
import { getUserByEmail } from '../query/inMemory/getUserByEmail';
import { getUsers } from '../query/inMemory/getUsers';

export class InMemoryUserGateway implements UserGateway {
  private users: InMemoryUserStore = new Map();

  async createUser(user: User): Promise<void> {
    return createUser(this.users, user);
  }

  async getUser(id: string): Promise<User | undefined> {
    return getUser(this.users, id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return getUserByEmail(this.users, email);
  }

  async getUsers(): Promise<User[]> {
    return getUsers(this.users);
  }

  async updateUser(user: User): Promise<void> {
    return updateUser(this.users, user);
  }

  clear(): void {
    this.users.clear();
  }
}
