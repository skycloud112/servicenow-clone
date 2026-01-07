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
import { updateUser } from '../updateUser';
import { getUser } from '../../../query/impls/getUser';

describe('updateUser', () => {
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

  it('updates an existing user in the database', async () => {
    const user = createDummyUser({ id: '1', email: 'original@example.com' });
    await createUser(pool, user);

    user.email = 'updated@example.com';
    user.displayName = 'Updated Name';
    user.role = 'admin';
    await updateUser(pool, user);

    const result = await getUser(pool, '1');
    expect(result?.email).toBe('updated@example.com');
    expect(result?.displayName).toBe('Updated Name');
    expect(result?.role).toBe('admin');
  });

  it('updates updatedAt field', async () => {
    const user = createDummyUser({ id: '1', updatedAt: new Date('2024-01-01') });
    await createUser(pool, user);

    user.updatedAt = new Date('2024-06-15');
    await updateUser(pool, user);

    const result = await getUser(pool, '1');
    expect(result?.updatedAt).toEqual(new Date('2024-06-15'));
  });
});
