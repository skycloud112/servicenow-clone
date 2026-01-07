import type pg from 'pg';
import type { Incident } from '@repo/entities/Incident';
import type { IncidentGateway } from './IncidentGateway.js';
import { createIncident } from './command/impls/createIncident.js';
import { updateIncident } from './command/impls/updateIncident.js';
import { deleteIncident } from './command/impls/deleteIncident.js';
import { getIncident } from './query/impls/getIncident.js';
import { getIncidents } from './query/impls/getIncidents.js';
import { getIncidentsByReporterId } from './query/impls/getIncidentsByReporterId.js';
import { getNextIncidentNumber } from './query/impls/getNextIncidentNumber.js';

export class IncidentGatewayImpl implements IncidentGateway {
  constructor(private pool: pg.Pool) {}

  async createIncident(incident: Incident): Promise<void> {
    return createIncident(this.pool, incident);
  }

  async getIncident(id: string): Promise<Incident | undefined> {
    return getIncident(this.pool, id);
  }

  async getIncidents(): Promise<Incident[]> {
    return getIncidents(this.pool);
  }

  async getIncidentsByReporterId(reporterId: string): Promise<Incident[]> {
    return getIncidentsByReporterId(this.pool, reporterId);
  }

  async updateIncident(incident: Incident): Promise<void> {
    return updateIncident(this.pool, incident);
  }

  async deleteIncident(id: string): Promise<void> {
    return deleteIncident(this.pool, id);
  }

  async getNextIncidentNumber(): Promise<string> {
    return getNextIncidentNumber(this.pool);
  }
}
