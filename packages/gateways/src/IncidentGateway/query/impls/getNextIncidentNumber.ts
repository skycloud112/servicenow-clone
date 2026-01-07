import type pg from 'pg';
import SQL from '@nearform/sql';
import { INCIDENT_TABLE_NAME, IncidentTableFieldNames } from '../../../tableUtils/incidentUtils';

type CountRow = {
  count: string;
};

export const getNextIncidentNumber = async (pool: pg.Pool): Promise<string> => {
  const query = SQL`
    SELECT COUNT(*) as count FROM ${SQL.unsafe(INCIDENT_TABLE_NAME)}
  `;
  const result = await pool.query<CountRow>(query.text, query.values);
  const count = parseInt(result.rows[0]?.count ?? '0', 10);
  return `INC${String(count + 1).padStart(7, '0')}`;
};
