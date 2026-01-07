import type pg from 'pg';
import type { Incident } from '@repo/entities/Incident';
import type { IncidentGateway } from './IncidentGateway';
import { createIncident } from './command/impls/createIncident';
import { updateIncident } from './command/impls/updateIncident';
import { deleteIncident } from './command/impls/deleteIncident';
import { getIncident } from './query/impls/getIncident';
import { getIncidents } from './query/impls/getIncidents';
import { getIncidentsByReporterId } from './query/impls/getIncidentsByReporterId';
import { getNextIncidentNumber } from './query/impls/getNextIncidentNumber';

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
