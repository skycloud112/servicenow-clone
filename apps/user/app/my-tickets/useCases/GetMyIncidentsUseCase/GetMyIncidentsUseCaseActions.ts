'use server';

import { IncidentGatewayImpl } from '@repo/gateways/IncidentGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import {
  GetMyIncidentsUseCase,
  type GetMyIncidentsRequest,
  type GetMyIncidentsResponse,
} from './GetMyIncidentsUseCase';

export const GetMyIncidentsUseCaseGetMyIncidentsAction = async (
  request: GetMyIncidentsRequest,
): Promise<GetMyIncidentsResponse> => {
  const useCase = createGetMyIncidentsUseCase();
  return useCase.getMyIncidents(request);
};

const createGetMyIncidentsUseCase = (): GetMyIncidentsUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new GetMyIncidentsUseCase(new IncidentGatewayImpl(pool));
};
