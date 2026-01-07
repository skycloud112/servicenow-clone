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
import { updateIncident } from '../updateIncident';
import { getIncident } from '../../../query/impls/getIncident';

describe('updateIncident', () => {
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

  it('updates an existing incident in the database', async () => {
    const incident = createDummyIncident({ id: '1', status: 'new' });
    await createIncident(pool, incident);

    incident.status = 'in_progress';
    incident.priority = 'high';
    incident.shortDescription = 'Updated Description';
    await updateIncident(pool, incident);

    const result = await getIncident(pool, '1');
    expect(result?.status).toBe('in_progress');
    expect(result?.priority).toBe('high');
    expect(result?.shortDescription).toBe('Updated Description');
  });

  it('updates assigneeId to a value', async () => {
    const incident = createDummyIncident({ id: '1' });
    await createIncident(pool, incident);

    incident.assigneeId = 'new-assignee';
    await updateIncident(pool, incident);

    const result = await getIncident(pool, '1');
    expect(result?.assigneeId).toBe('new-assignee');
  });
});
