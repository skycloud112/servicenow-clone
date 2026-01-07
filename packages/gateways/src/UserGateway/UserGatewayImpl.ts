import type pg from 'pg';
import type { User } from '@repo/entities/User';
import type { UserGateway } from './UserGateway';
import { createUser } from './command/impls/createUser';
import { updateUser } from './command/impls/updateUser';
import { getUser } from './query/impls/getUser';
import { getUserByEmail } from './query/impls/getUserByEmail';
import { getUsers } from './query/impls/getUsers';

export class UserGatewayImpl implements UserGateway {
  constructor(private pool: pg.Pool) {}

  async createUser(user: User): Promise<void> {
    return createUser(this.pool, user);
  }

  async getUser(id: string): Promise<User | undefined> {
    return getUser(this.pool, id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return getUserByEmail(this.pool, email);
  }

  async getUsers(): Promise<User[]> {
    return getUsers(this.pool);
  }

  async updateUser(user: User): Promise<void> {
    return updateUser(this.pool, user);
  }
}
