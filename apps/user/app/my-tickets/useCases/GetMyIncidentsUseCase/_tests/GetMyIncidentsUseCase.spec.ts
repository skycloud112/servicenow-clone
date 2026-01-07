import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InMemoryIncidentGateway } from '@repo/gateways/InMemoryIncidentGateway';
import { createDummyIncident } from '@repo/entities/Incident.testUtils';
import { GetMyIncidentsUseCase } from '../GetMyIncidentsUseCase';

type TestContext = {
  incidentGateway: InMemoryIncidentGateway;
  createUseCase: () => GetMyIncidentsUseCase;
};

const createTestContext = (): TestContext => {
  vi.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));

  const incidentGateway = new InMemoryIncidentGateway();

  const createUseCase = (): GetMyIncidentsUseCase => {
    return new GetMyIncidentsUseCase(incidentGateway);
  };

  return {
    incidentGateway,
    createUseCase,
  };
};

describe('GetMyIncidentsUseCase', () => {
  let ctx: TestContext;

  beforeEach(() => {
    ctx = createTestContext();
  });

  it('should return empty list when user has no incidents', async () => {
    const useCase = ctx.createUseCase();

    const response = await useCase.getMyIncidents({ reporterId: 'user-1' });

    expect(response.incidents).toEqual([]);
  });

  it('should return only incidents for the specified reporter', async () => {
    const incident1 = createDummyIncident({ id: '1', reporterId: 'user-1' });
    const incident2 = createDummyIncident({ id: '2', reporterId: 'user-2' });
    const incident3 = createDummyIncident({ id: '3', reporterId: 'user-1' });
    await ctx.incidentGateway.createIncident(incident1);
    await ctx.incidentGateway.createIncident(incident2);
    await ctx.incidentGateway.createIncident(incident3);

    const useCase = ctx.createUseCase();
    const response = await useCase.getMyIncidents({ reporterId: 'user-1' });

    expect(response.incidents.length).toBe(2);
    expect(response.incidents.every((i) => i.id === '1' || i.id === '3')).toBe(true);
  });

  it('should convert dates to ISO strings', async () => {
    const incident = createDummyIncident({
      id: '1',
      reporterId: 'user-1',
      createdAt: new Date('2025-01-15T12:00:00.000Z'),
    });
    await ctx.incidentGateway.createIncident(incident);

    const useCase = ctx.createUseCase();
    const response = await useCase.getMyIncidents({ reporterId: 'user-1' });

    expect(response.incidents[0]?.createdAt).toBe('2025-01-15T12:00:00.000Z');
  });
});
