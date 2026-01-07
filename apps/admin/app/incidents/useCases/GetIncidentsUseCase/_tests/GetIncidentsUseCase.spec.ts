import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryIncidentGateway } from '@repo/gateways/InMemoryIncidentGateway';
import { createDummyIncident } from '@repo/entities/Incident.testUtils';
import { GetIncidentsUseCase } from '../GetIncidentsUseCase';

type TestContext = {
  incidentGateway: InMemoryIncidentGateway;
  createUseCase: () => GetIncidentsUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const incidentGateway = new InMemoryIncidentGateway();

  const createUseCase = (): GetIncidentsUseCase => {
    return new GetIncidentsUseCase(incidentGateway);
  };

  return {
    incidentGateway,
    createUseCase,
  };
};

describe('GetIncidentsUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should return empty list when no incidents exist', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.getIncidents();

    expect(response.incidents).toEqual([]);
  });

  it('should return all incidents as DTOs', async () => {
    const incident1 = createDummyIncident({
      id: '1',
      number: 'INC0000001',
      createdAt: new Date('2025-01-15T11:00:00.000Z'),
    });
    const incident2 = createDummyIncident({
      id: '2',
      number: 'INC0000002',
      createdAt: new Date('2025-01-15T12:00:00.000Z'),
    });
    await ctx.incidentGateway.createIncident(incident1);
    await ctx.incidentGateway.createIncident(incident2);

    const useCase = ctx.createUseCase();
    const response = await useCase.getIncidents();

    expect(response.incidents.length).toBe(2);
    expect(response.incidents[0]?.number).toBe('INC0000002');
    expect(response.incidents[1]?.number).toBe('INC0000001');
  });

  it('should convert dates to ISO strings', async () => {
    const incident = createDummyIncident({
      id: '1',
      createdAt: new Date('2025-01-15T12:00:00.000Z'),
    });
    await ctx.incidentGateway.createIncident(incident);

    const useCase = ctx.createUseCase();
    const response = await useCase.getIncidents();

    expect(response.incidents[0]?.createdAt).toBe('2025-01-15T12:00:00.000Z');
  });
});
