import type { IncidentGateway } from '@repo/gateways/IncidentGateway';
import type { IncidentStatus, IncidentPriority } from '@repo/entities/Incident';
import { toISOString } from '@repo/utils/date';

export type IncidentDto = {
  id: string;
  number: string;
  shortDescription: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  createdAt: string;
  updatedAt: string;
};

export type GetMyIncidentsRequest = {
  reporterId: string;
};

export type GetMyIncidentsResponse = {
  incidents: IncidentDto[];
};

export class GetMyIncidentsUseCase {
  constructor(private incidentGateway: IncidentGateway) {}

  async getMyIncidents(request: GetMyIncidentsRequest): Promise<GetMyIncidentsResponse> {
    const incidents = await this.incidentGateway.getIncidentsByReporterId(request.reporterId);
    return {
      incidents: incidents.map((incident) => ({
        id: incident.id,
        number: incident.number,
        shortDescription: incident.shortDescription,
        description: incident.description,
        status: incident.status,
        priority: incident.priority,
        createdAt: toISOString(incident.createdAt),
        updatedAt: toISOString(incident.updatedAt),
      })),
    };
  }
}
