import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyUser } from '@repo/entities/User.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING';
import {
  setupUserTestDatabase,
  cleanupUserTestData,
  teardownUserTestDatabase,
} from '../../../userGatewayTestUtils';
import { createUser } from '../../../command/impls/createUser';
import { getUser } from '../getUser';

describe('getUser', () => {
  let pool: Pool;

  beforeAll(async () => {
    pool = await setupUserTestDatabase(TEST_DB_CONNECTION_STRING);
  });

  afterAll(async () => {
    await teardownUserTestDatabase(pool);
  });

  beforeEach(async () => {
    await cleanupUserTestData(pool);
  });

  it('returns user when found', async () => {
    const user = createDummyUser({ id: '1' });
    await createUser(pool, user);

    const result = await getUser(pool, '1');

    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
  });

  it('returns undefined when user not found', async () => {
    const result = await getUser(pool, 'non-existent');

    expect(result).toBeUndefined();
  });
});
