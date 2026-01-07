import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyUser } from '@repo/entities/User.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING';
import {
  setupUserTestDatabase,
  cleanupUserTestData,
  teardownUserTestDatabase,
} from '../../../userGatewayTestUtils';
import { createUser } from '../createUser';
import { getUser } from '../../../query/impls/getUser';

describe('createUser', () => {
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

  it('creates a user in the database', async () => {
    const user = createDummyUser({ id: '1' });

    await createUser(pool, user);

    const result = await getUser(pool, '1');
    expect(result).toBeDefined();
    expect(result?.id).toBe('1');
    expect(result?.email).toBe(user.email);
    expect(result?.displayName).toBe(user.displayName);
    expect(result?.role).toBe(user.role);
  });

  it('creates a user with admin role', async () => {
    const user = createDummyUser({ id: '1', role: 'admin' });

    await createUser(pool, user);

    const result = await getUser(pool, '1');
    expect(result?.role).toBe('admin');
  });
});
