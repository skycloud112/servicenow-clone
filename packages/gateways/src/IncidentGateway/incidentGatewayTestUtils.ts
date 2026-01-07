import { Pool } from 'pg';
import { createIncidentTable, deleteAllIncidents } from '../tableUtils/incidentUtils.js';
import { createPool } from '../poolUtils.js';

export const setupIncidentTestDatabase = async (connectionString: string): Promise<Pool> => {
  const pool = createPool(connectionString);
  await createIncidentTable(pool);
  return pool;
};

export const cleanupIncidentTestData = async (pool: Pool): Promise<void> => {
  await deleteAllIncidents(pool);
};

export const teardownIncidentTestDatabase = async (pool: Pool): Promise<void> => {
  await pool.end();
};
