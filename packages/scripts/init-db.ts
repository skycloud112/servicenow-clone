import pg from 'pg';
import { createUserTable } from '@repo/gateways/tableUtils/userUtils';
import { createIncidentTable } from '@repo/gateways/tableUtils/incidentUtils';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

const run = async (): Promise<void> => {
  console.log('Initializing database...');

  await createUserTable(pool);
  console.log('Created user table');

  await createIncidentTable(pool);
  console.log('Created incident table');

  console.log('Database initialization complete');

  await pool.end();
  process.exit(0);
};

run().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
