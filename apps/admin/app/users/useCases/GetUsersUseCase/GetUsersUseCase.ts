import type { UserGateway } from '@repo/gateways/UserGateway';
import type { UserRole } from '@repo/entities/User';
import { toISOString } from '@repo/utils/date';

export type UserDto = {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type GetUsersResponse = {
  users: UserDto[];
};

export class GetUsersUseCase {
  constructor(private userGateway: UserGateway) {}

  async getUsers(): Promise<GetUsersResponse> {
    const users = await this.userGateway.getUsers();
    return {
      users: users.map((user) => ({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: toISOString(user.createdAt),
        updatedAt: toISOString(user.updatedAt),
      })),
    };
  }
}
