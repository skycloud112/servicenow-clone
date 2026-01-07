'use server';

import { UserGatewayImpl } from '@repo/gateways/UserGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import {
  CreateUserUseCase,
  type CreateUserRequest,
  type CreateUserResponse,
} from './CreateUserUseCase';

export const CreateUserUseCaseCreateUserAction = async (
  request: CreateUserRequest,
): Promise<CreateUserResponse> => {
  const useCase = createCreateUserUseCase();
  return useCase.createUser(request);
};

const createCreateUserUseCase = (): CreateUserUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new CreateUserUseCase(new UserGatewayImpl(pool));
};
