import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryIncidentGateway } from '@repo/gateways/InMemoryIncidentGateway';
import { CreateIncidentUseCase } from '../CreateIncidentUseCase';

type TestContext = {
  incidentGateway: InMemoryIncidentGateway;
  createUseCase: () => CreateIncidentUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const incidentGateway = new InMemoryIncidentGateway();

  const createUseCase = (): CreateIncidentUseCase => {
    return new CreateIncidentUseCase(incidentGateway);
  };

  return {
    incidentGateway,
    createUseCase,
  };
};

describe('CreateIncidentUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should create an incident with the given details', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createIncident({
      shortDescription: 'Login not working',
      description: 'Users cannot log in to the system',
      priority: 'high',
      reporterId: 'user-1',
    });

    expect(response.incidentId.length).toBeGreaterThan(0);
    expect(response.incidentNumber).toBe('INC0000001');

    const createdIncident = await ctx.incidentGateway.getIncident(response.incidentId);
    expect(createdIncident).toBeDefined();
    expect(createdIncident!.shortDescription).toBe('Login not working');
    expect(createdIncident!.status).toBe('new');
    expect(createdIncident!.priority).toBe('high');
  });

  it('should set createdAt and updatedAt to current time', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.createIncident({
      shortDescription: 'Test incident',
      description: 'Test description',
      priority: 'medium',
      reporterId: 'user-1',
    });

    const createdIncident = await ctx.incidentGateway.getIncident(response.incidentId);
    expect(createdIncident!.createdAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
    expect(createdIncident!.updatedAt).toEqual(new Date('2025-01-15T12:00:00.000Z'));
  });

  it('should generate sequential incident numbers', async () => {
    const useCase = ctx.createUseCase();

    const response1 = await useCase.createIncident({
      shortDescription: 'First incident',
      description: 'Description 1',
      priority: 'low',
      reporterId: 'user-1',
    });

    const response2 = await useCase.createIncident({
      shortDescription: 'Second incident',
      description: 'Description 2',
      priority: 'low',
      reporterId: 'user-1',
    });

    expect(response1.incidentNumber).toBe('INC0000001');
    expect(response2.incidentNumber).toBe('INC0000002');
  });
});
