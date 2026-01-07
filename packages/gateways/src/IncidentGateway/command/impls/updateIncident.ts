import type pg from 'pg';
import SQL from '@nearform/sql';
import type { Incident } from '@repo/entities/Incident';
import { INCIDENT_TABLE_NAME, IncidentTableFieldNames } from '../../../tableUtils/incidentUtils.js';

export const updateIncident = async (pool: pg.Pool, incident: Incident): Promise<void> => {
  const query = SQL`
    UPDATE ${SQL.unsafe(INCIDENT_TABLE_NAME)}
    SET
      ${SQL.unsafe(IncidentTableFieldNames.number)} = ${incident.number},
      ${SQL.unsafe(IncidentTableFieldNames.short_description)} = ${incident.shortDescription},
      ${SQL.unsafe(IncidentTableFieldNames.description)} = ${incident.description},
      ${SQL.unsafe(IncidentTableFieldNames.status)} = ${incident.status},
      ${SQL.unsafe(IncidentTableFieldNames.priority)} = ${incident.priority},
      ${SQL.unsafe(IncidentTableFieldNames.reporter_id)} = ${incident.reporterId},
      ${SQL.unsafe(IncidentTableFieldNames.assignee_id)} = ${incident.assigneeId ?? null},
      ${SQL.unsafe(IncidentTableFieldNames.updated_at)} = ${incident.updatedAt},
      ${SQL.unsafe(IncidentTableFieldNames.resolved_at)} = ${incident.resolvedAt ?? null}
    WHERE ${SQL.unsafe(IncidentTableFieldNames.id)} = ${incident.id}
  `;
  await pool.query(query.text, query.values);
};
