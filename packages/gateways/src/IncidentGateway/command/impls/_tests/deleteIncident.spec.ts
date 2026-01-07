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
import { deleteIncident } from '../deleteIncident';
import { getIncident } from '../../../query/impls/getIncident';

describe('deleteIncident', () => {
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

  it('deletes an incident from the database', async () => {
    const incident = createDummyIncident({ id: '1' });
    await createIncident(pool, incident);

    await deleteIncident(pool, '1');

    const result = await getIncident(pool, '1');
    expect(result).toBeUndefined();
  });

  it('does not throw when deleting non-existent incident', async () => {
    await expect(deleteIncident(pool, 'non-existent')).resolves.not.toThrow();
  });
});
