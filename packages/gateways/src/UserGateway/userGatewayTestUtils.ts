import type pg from 'pg';
import { createUserTable, deleteAllUsers } from '../tableUtils/userUtils.js';

export const setupUserTestDatabase = async (pool: pg.Pool): Promise<void> => {
  await createUserTable(pool);
};

export const cleanupUserTestData = async (pool: pg.Pool): Promise<void> => {
  await deleteAllUsers(pool);
};

export const teardownUserTestDatabase = async (pool: pg.Pool): Promise<void> => {
  await pool.end();
};
