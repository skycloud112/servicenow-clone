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
import { getUserByEmail } from '../getUserByEmail';

describe('getUserByEmail', () => {
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

  it('returns user when found by email', async () => {
    const user = createDummyUser({ id: '1', email: 'find@example.com' });
    await createUser(pool, user);

    const result = await getUserByEmail(pool, 'find@example.com');

    expect(result).toBeDefined();
    expect(result?.email).toBe('find@example.com');
  });

  it('returns undefined when email not found', async () => {
    const result = await getUserByEmail(pool, 'nonexistent@example.com');

    expect(result).toBeUndefined();
  });
});
