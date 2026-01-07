import { Pool } from 'pg';
import { createUserTable, deleteAllUsers } from '../tableUtils/userUtils';
import { createPool } from '../poolUtils';

export const setupUserTestDatabase = async (connectionString: string): Promise<Pool> => {
  const pool = createPool(connectionString);
  await createUserTable(pool);
  return pool;
};

export const cleanupUserTestData = async (pool: Pool): Promise<void> => {
  await deleteAllUsers(pool);
};

export const teardownUserTestDatabase = async (pool: Pool): Promise<void> => {
  await pool.end();
};
