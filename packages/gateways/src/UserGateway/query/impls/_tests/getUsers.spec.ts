import { Pool } from 'pg';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createDummyUser } from '@repo/entities/User.testUtils';
import { TEST_DB_CONNECTION_STRING } from '../../../../utils/TEST_DB_CONNECTION_STRING.js';
import {
  setupUserTestDatabase,
  cleanupUserTestData,
  teardownUserTestDatabase,
} from '../../../userGatewayTestUtils.js';
import { createUser } from '../../../command/impls/createUser.js';
import { getUsers } from '../getUsers.js';

describe('getUsers', () => {
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

  it('returns all users ordered by created_at desc', async () => {
    const user1 = createDummyUser({ id: '1', createdAt: new Date('2024-01-01') });
    const user2 = createDummyUser({ id: '2', email: 'second@example.com', createdAt: new Date('2024-01-02') });
    await createUser(pool, user1);
    await createUser(pool, user2);

    const result = await getUsers(pool);

    expect(result).toHaveLength(2);
    expect(result[0]!.id).toBe('2');
    expect(result[1]!.id).toBe('1');
  });

  it('returns empty array when no users exist', async () => {
    const result = await getUsers(pool);

    expect(result).toEqual([]);
  });
});
