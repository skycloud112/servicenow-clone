import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyIncident } from '@repo/entities/Incident.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING.js';
import {
  setupIncidentTestDatabase,
  cleanupIncidentTestData,
  teardownIncidentTestDatabase,
} from '../../../incidentGatewayTestUtils.js';
import { createIncident } from '../../../command/impls/createIncident.js';
import { getNextIncidentNumber } from '../getNextIncidentNumber.js';

describe('getNextIncidentNumber', () => {
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

  it('returns INC0000001 when no incidents exist', async () => {
    const result = await getNextIncidentNumber(pool);

    expect(result).toBe('INC0000001');
  });

  it('returns next incident number based on count', async () => {
    const incident1 = createDummyIncident({ id: '1', number: 'INC0000001' });
    const incident2 = createDummyIncident({ id: '2', number: 'INC0000002' });
    await createIncident(pool, incident1);
    await createIncident(pool, incident2);

    const result = await getNextIncidentNumber(pool);

    expect(result).toBe('INC0000003');
  });
});
