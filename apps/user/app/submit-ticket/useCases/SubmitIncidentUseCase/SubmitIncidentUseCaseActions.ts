'use server';

import { IncidentGatewayImpl } from '@repo/gateways/IncidentGatewayImpl';
import { getSharedPool } from '@repo/gateways/poolUtils';
import { POSTGRES_URL } from '../../../../env';
import {
  SubmitIncidentUseCase,
  type SubmitIncidentRequest,
  type SubmitIncidentResponse,
} from './SubmitIncidentUseCase';

export const SubmitIncidentUseCaseSubmitIncidentAction = async (
  request: SubmitIncidentRequest,
): Promise<SubmitIncidentResponse> => {
  const useCase = createSubmitIncidentUseCase();
  return useCase.submitIncident(request);
};

const createSubmitIncidentUseCase = (): SubmitIncidentUseCase => {
  const pool = getSharedPool(POSTGRES_URL);
  return new SubmitIncidentUseCase(new IncidentGatewayImpl(pool));
};
