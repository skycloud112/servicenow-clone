'use server';

import { IncidentGatewayImpl } from '@repo/gateways/IncidentGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import { GetIncidentsUseCase, type GetIncidentsResponse } from './GetIncidentsUseCase';

export const GetIncidentsUseCaseGetIncidentsAction = async (): Promise<GetIncidentsResponse> => {
  const useCase = createGetIncidentsUseCase();
  return useCase.getIncidents();
};

const createGetIncidentsUseCase = (): GetIncidentsUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new GetIncidentsUseCase(new IncidentGatewayImpl(pool));
};
