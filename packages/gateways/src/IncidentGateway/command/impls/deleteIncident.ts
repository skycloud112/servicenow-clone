import type pg from 'pg';
import SQL from '@nearform/sql';
import { INCIDENT_TABLE_NAME, IncidentTableFieldNames } from '../../../tableUtils/incidentUtils';

export const deleteIncident = async (pool: pg.Pool, id: string): Promise<void> => {
  const query = SQL`
    DELETE FROM ${SQL.unsafe(INCIDENT_TABLE_NAME)}
    WHERE ${SQL.unsafe(IncidentTableFieldNames.id)} = ${id}
  `;
  await pool.query(query.text, query.values);
};
