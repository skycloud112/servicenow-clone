import type pg from 'pg';
import SQL from '@nearform/sql';
import { Incident, IncidentStatus, IncidentPriority } from '@repo/entities/Incident';
import { INCIDENT_TABLE_NAME, IncidentTableFieldNames } from '../../../tableUtils/incidentUtils.js';

type IncidentRow = {
  id: string;
  number: string;
  short_description: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  reporter_id: string;
  assignee_id: string | null;
  created_at: Date;
  updated_at: Date;
  resolved_at: Date | null;
};

export const getIncident = async (pool: pg.Pool, id: string): Promise<Incident | undefined> => {
  const query = SQL`
    SELECT
      ${SQL.unsafe(IncidentTableFieldNames.id)},
      ${SQL.unsafe(IncidentTableFieldNames.number)},
      ${SQL.unsafe(IncidentTableFieldNames.short_description)},
      ${SQL.unsafe(IncidentTableFieldNames.description)},
      ${SQL.unsafe(IncidentTableFieldNames.status)},
      ${SQL.unsafe(IncidentTableFieldNames.priority)},
      ${SQL.unsafe(IncidentTableFieldNames.reporter_id)},
      ${SQL.unsafe(IncidentTableFieldNames.assignee_id)},
      ${SQL.unsafe(IncidentTableFieldNames.created_at)},
      ${SQL.unsafe(IncidentTableFieldNames.updated_at)},
      ${SQL.unsafe(IncidentTableFieldNames.resolved_at)}
    FROM ${SQL.unsafe(INCIDENT_TABLE_NAME)}
    WHERE ${SQL.unsafe(IncidentTableFieldNames.id)} = ${id}
  `;
  const result = await pool.query<IncidentRow>(query.text, query.values);
  const row = result.rows[0];
  return row ? mapRowToIncident(row) : undefined;
};

const mapRowToIncident = (row: IncidentRow): Incident => {
  return new Incident(
    row.id,
    row.number,
    row.short_description,
    row.description,
    row.status,
    row.priority,
    row.reporter_id,
    row.assignee_id ?? undefined,
    row.created_at,
    row.updated_at,
    row.resolved_at ?? undefined,
  );
};
