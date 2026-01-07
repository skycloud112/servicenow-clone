import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyIncident } from '@repo/entities/Incident.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING';
import {
  setupIncidentTestDatabase,
  cleanupIncidentTestData,
  teardownIncidentTestDatabase,
} from '../../../incidentGatewayTestUtils';
import { createIncident } from '../../../command/impls/createIncident';
import { getIncidents } from '../getIncidents';

describe('getIncidents', () => {
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

  it('returns all incidents ordered by created_at desc', async () => {
    const incident1 = createDummyIncident({ id: '1', number: 'INC0000001', createdAt: new Date('2024-01-01') });
    const incident2 = createDummyIncident({ id: '2', number: 'INC0000002', createdAt: new Date('2024-01-02') });
    await createIncident(pool, incident1);
    await createIncident(pool, incident2);

    const result = await getIncidents(pool);

    expect(result).toHaveLength(2);
    expect(result[0]!.id).toBe('2');
    expect(result[1]!.id).toBe('1');
  });

  it('returns empty array when no incidents exist', async () => {
    const result = await getIncidents(pool);

    expect(result).toEqual([]);
  });
});
