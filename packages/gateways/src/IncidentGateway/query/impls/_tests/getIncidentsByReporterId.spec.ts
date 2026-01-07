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
import { getIncidentsByReporterId } from '../getIncidentsByReporterId';

describe('getIncidentsByReporterId', () => {
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

  it('returns incidents for a specific reporter', async () => {
    const incident1 = createDummyIncident({ id: '1', number: 'INC0000001', reporterId: 'reporter-1' });
    const incident2 = createDummyIncident({ id: '2', number: 'INC0000002', reporterId: 'reporter-2' });
    const incident3 = createDummyIncident({ id: '3', number: 'INC0000003', reporterId: 'reporter-1' });
    await createIncident(pool, incident1);
    await createIncident(pool, incident2);
    await createIncident(pool, incident3);

    const result = await getIncidentsByReporterId(pool, 'reporter-1');

    expect(result).toHaveLength(2);
    expect(result.every((i) => i.reporterId === 'reporter-1')).toBe(true);
  });

  it('returns empty array when no incidents for reporter', async () => {
    const result = await getIncidentsByReporterId(pool, 'unknown-reporter');

    expect(result).toEqual([]);
  });
});
