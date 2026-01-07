'use server';

import { UserGatewayImpl } from '@repo/gateways/UserGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import { GetUsersUseCase, type GetUsersResponse } from './GetUsersUseCase';

export const GetUsersUseCaseGetUsersAction = async (): Promise<GetUsersResponse> => {
  const useCase = createGetUsersUseCase();
  return useCase.getUsers();
};

const createGetUsersUseCase = (): GetUsersUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new GetUsersUseCase(new UserGatewayImpl(pool));
};
