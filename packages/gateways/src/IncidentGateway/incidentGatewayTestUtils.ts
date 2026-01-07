import type pg from 'pg';
import { createIncidentTable, deleteAllIncidents } from '../tableUtils/incidentUtils.js';

export const setupIncidentTestDatabase = async (pool: pg.Pool): Promise<void> => {
  await createIncidentTable(pool);
};

export const cleanupIncidentTestData = async (pool: pg.Pool): Promise<void> => {
  await deleteAllIncidents(pool);
};

export const teardownIncidentTestDatabase = async (pool: pg.Pool): Promise<void> => {
  await pool.end();
};
