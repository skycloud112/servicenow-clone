import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryIncidentGateway } from '@repo/gateways/InMemoryIncidentGateway';
import { SubmitIncidentUseCase } from '../SubmitIncidentUseCase';

type TestContext = {
  incidentGateway: InMemoryIncidentGateway;
  createUseCase: () => SubmitIncidentUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const incidentGateway = new InMemoryIncidentGateway();

  const createUseCase = (): SubmitIncidentUseCase => {
    return new SubmitIncidentUseCase(incidentGateway);
  };

  return {
    incidentGateway,
    createUseCase,
  };
};

describe('SubmitIncidentUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should submit an incident with the given details', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.submitIncident({
      shortDescription: 'Cannot access email',
      description: 'Getting error when trying to open Outlook',
      priority: 'high',
      reporterId: 'user-123',
    });

    expect(response.incidentId.length).toBeGreaterThan(0);
    expect(response.incidentNumber).toBe('INC0000001');

    const createdIncident = await ctx.incidentGateway.getIncident(response.incidentId);
    expect(createdIncident).toBeDefined();
    expect(createdIncident!.shortDescription).toBe('Cannot access email');
    expect(createdIncident!.status).toBe('new');
    expect(createdIncident!.reporterId).toBe('user-123');
    expect(createdIncident!.assigneeId).toBeUndefined();
  });

  it('should set createdAt and updatedAt to current time', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.submitIncident({
      shortDescription: 'Test incident',
      description: 'Test description',
      priority: 'low',
      reporterId: 'user-1',
    });

    const createdIncident = await ctx.incidentGateway.getIncident(response.incidentId);
    expect(createdIncident!.createdAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
    expect(createdIncident!.updatedAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
  });
});
