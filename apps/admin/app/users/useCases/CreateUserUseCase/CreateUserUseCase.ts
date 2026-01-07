import { User, UserRole } from '@repo/entities/User';
import type { UserGateway } from '@repo/gateways/UserGateway';
import { uuid } from '@repo/utils/uuid';

export type CreateUserRequest = {
  email: string;
  displayName: string;
  role: UserRole;
};

export type CreateUserResponse = {
  userId: string;
};

export class CreateUserUseCase {
  constructor(private userGateway: UserGateway) {}

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const id = uuid();
    const now = new Date();

    const user = new User(id, request.email, request.displayName, request.role, now, now);

    await this.userGateway.createUser(user);
    return { userId: id };
  }
}
