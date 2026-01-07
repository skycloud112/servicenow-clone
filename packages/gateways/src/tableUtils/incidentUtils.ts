import type pg from 'pg';

export const INCIDENT_TABLE_NAME = 'incident';

export const IncidentTableFieldNames = {
  id: 'id',
  number: 'number',
  short_description: 'short_description',
  description: 'description',
  status: 'status',
  priority: 'priority',
  reporter_id: 'reporter_id',
  assignee_id: 'assignee_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  resolved_at: 'resolved_at',
} as const;

export const createIncidentTable = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DROP TABLE IF EXISTS ${INCIDENT_TABLE_NAME} CASCADE`);
  await pool.query(`
    CREATE TABLE ${INCIDENT_TABLE_NAME} (
      ${IncidentTableFieldNames.id} TEXT PRIMARY KEY,
      ${IncidentTableFieldNames.number} TEXT NOT NULL UNIQUE,
      ${IncidentTableFieldNames.short_description} TEXT NOT NULL,
      ${IncidentTableFieldNames.description} TEXT NOT NULL,
      ${IncidentTableFieldNames.status} TEXT NOT NULL DEFAULT 'new',
      ${IncidentTableFieldNames.priority} TEXT NOT NULL DEFAULT 'medium',
      ${IncidentTableFieldNames.reporter_id} TEXT NOT NULL,
      ${IncidentTableFieldNames.assignee_id} TEXT,
      ${IncidentTableFieldNames.created_at} TIMESTAMPTZ NOT NULL,
      ${IncidentTableFieldNames.updated_at} TIMESTAMPTZ NOT NULL,
      ${IncidentTableFieldNames.resolved_at} TIMESTAMPTZ
    )
  `);
  await pool.query(`
    CREATE INDEX idx_incident_reporter ON ${INCIDENT_TABLE_NAME}(${IncidentTableFieldNames.reporter_id})
  `);
  await pool.query(`
    CREATE INDEX idx_incident_status ON ${INCIDENT_TABLE_NAME}(${IncidentTableFieldNames.status})
  `);
};

export const deleteAllIncidents = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DELETE FROM ${INCIDENT_TABLE_NAME}`);
};
