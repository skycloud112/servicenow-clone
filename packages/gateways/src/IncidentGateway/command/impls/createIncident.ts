import type pg from 'pg';
import SQL from '@nearform/sql';
import type { Incident } from '@repo/entities/Incident';
import { INCIDENT_TABLE_NAME, IncidentTableFieldNames } from '../../../tableUtils/incidentUtils.js';

export const createIncident = async (pool: pg.Pool, incident: Incident): Promise<void> => {
  const query = SQL`
    INSERT INTO ${SQL.unsafe(INCIDENT_TABLE_NAME)} (
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
    ) VALUES (
      ${incident.id},
      ${incident.number},
      ${incident.shortDescription},
      ${incident.description},
      ${incident.status},
      ${incident.priority},
      ${incident.reporterId},
      ${incident.assigneeId ?? null},
      ${incident.createdAt},
      ${incident.updatedAt},
      ${incident.resolvedAt ?? null}
    )
  `;
  await pool.query(query.text, query.values);
};
