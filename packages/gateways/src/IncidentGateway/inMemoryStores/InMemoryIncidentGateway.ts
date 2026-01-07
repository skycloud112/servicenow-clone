import type { Incident } from '@repo/entities/Incident';
import type { IncidentGateway } from '../IncidentGateway.js';
import type { InMemoryIncidentStore } from './InMemoryIncidentStore.js';
import { createIncident } from '../command/inMemory/createIncident.js';
import { updateIncident } from '../command/inMemory/updateIncident.js';
import { deleteIncident } from '../command/inMemory/deleteIncident.js';
import { getIncident } from '../query/inMemory/getIncident.js';
import { getIncidents } from '../query/inMemory/getIncidents.js';
import { getIncidentsByReporterId } from '../query/inMemory/getIncidentsByReporterId.js';

export class InMemoryIncidentGateway implements IncidentGateway {
  private incidents: InMemoryIncidentStore = new Map();
  private incidentCounter = 0;

  async createIncident(incident: Incident): Promise<void> {
    return createIncident(this.incidents, incident);
  }

  async getIncident(id: string): Promise<Incident | undefined> {
    return getIncident(this.incidents, id);
  }

  async getIncidents(): Promise<Incident[]> {
    return getIncidents(this.incidents);
  }

  async getIncidentsByReporterId(reporterId: string): Promise<Incident[]> {
    return getIncidentsByReporterId(this.incidents, reporterId);
  }

  async updateIncident(incident: Incident): Promise<void> {
    return updateIncident(this.incidents, incident);
  }

  async deleteIncident(id: string): Promise<void> {
    return deleteIncident(this.incidents, id);
  }

  async getNextIncidentNumber(): Promise<string> {
    this.incidentCounter++;
    return `INC${String(this.incidentCounter).padStart(7, '0')}`;
  }

  clear(): void {
    this.incidents.clear();
    this.incidentCounter = 0;
  }
}
