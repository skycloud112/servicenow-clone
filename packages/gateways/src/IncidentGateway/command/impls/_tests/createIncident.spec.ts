import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyIncident } from '@repo/entities/Incident.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING';
import {
  setupIncidentTestDatabase,
  cleanupIncidentTestData,
  teardownIncidentTestDatabase,
} from '../../../incidentGatewayTestUtils';
import { createIncident } from '../createIncident';
import { getIncident } from '../../../query/impls/getIncident';

describe('createIncident', () => {
  let pool: Pool;

  beforeAll(async () => {
    pool = await setupIncidentTestDatabase(TEST_DB_CONNECTION_STRING);
  });

  afterAll(async () => {
    await teardownIncidentTestDatabase(pool);
  });

  beforeEach(async () => {
    await cleanupIncidentTestData(pool);
  });

  it('creates an incident in the database', async () => {
    const incident = createDummyIncident({ id: '1' });

    await createIncident(pool, incident);

    const result = await getIncident(pool, '1');
    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
    expect(result?.shortDescription).toBe(incident.shortDescription);
    expect(result?.status).toBe(incident.status);
    expect(result?.priority).toBe(incident.priority);
  });

  it('creates incident with optional assigneeId', async () => {
    const incident = createDummyIncident({ id: '1', assigneeId: 'assignee-1' });

    await createIncident(pool, incident);

    const result = await getIncident(pool, '1');
    expect(result?.assigneeId).toBe('assignee-1');
  });

  it('creates incident with resolvedAt', async () => {
    const resolvedAt = new Date('2024-01-15');
    const incident = createDummyIncident({ id: '1', resolvedAt });

    await createIncident(pool, incident);

    const result = await getIncident(pool, '1');
    expect(result?.resolvedAt).toEqual(resolvedAt);
  });
});
