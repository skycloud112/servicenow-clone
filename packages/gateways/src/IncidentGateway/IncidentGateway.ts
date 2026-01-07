import type { Incident } from '@repo/entities/Incident';

export interface IncidentGateway {
  createIncident(incident: Incident): Promise<void>;
  getIncident(id: string): Promise<Incident | undefined>;
  getIncidents(): Promise<Incident[]>;
  getIncidentsByReporterId(reporterId: string): Promise<Incident[]>;
  updateIncident(incident: Incident): Promise<void>;
  deleteIncident(id: string): Promise<void>;
  getNextIncidentNumber(): Promise<string>;
}
