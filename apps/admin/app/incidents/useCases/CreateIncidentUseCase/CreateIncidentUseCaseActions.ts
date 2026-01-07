'use server';

import { IncidentGatewayImpl } from '@repo/gateways/IncidentGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import {
  CreateIncidentUseCase,
  type CreateIncidentRequest,
  type CreateIncidentResponse,
} from './CreateIncidentUseCase';

export const CreateIncidentUseCaseCreateIncidentAction = async (
  request: CreateIncidentRequest,
): Promise<CreateIncidentResponse> => {
  const useCase = createCreateIncidentUseCase();
  return useCase.createIncident(request);
};

const createCreateIncidentUseCase = (): CreateIncidentUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new CreateIncidentUseCase(new IncidentGatewayImpl(pool));
};
