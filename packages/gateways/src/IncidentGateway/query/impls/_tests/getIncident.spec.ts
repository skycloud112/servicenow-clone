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
import { getIncident } from '../getIncident';

describe('getIncident', () => {
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

  it('returns incident when found', async () => {
    const incident = createDummyIncident({ id: '1' });
    await createIncident(pool, incident);

    const result = await getIncident(pool, '1');

    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
  });

  it('returns undefined when incident not found', async () => {
    const result = await getIncident(pool, 'non-existent');

    expect(result).toBeUndefined();
  });
});
