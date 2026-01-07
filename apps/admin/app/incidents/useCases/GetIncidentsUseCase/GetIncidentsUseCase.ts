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
  reporterId: string;
  assigneeId: string | undefined;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | undefined;
};

export type GetIncidentsResponse = {
  incidents: IncidentDto[];
};

export class GetIncidentsUseCase {
  constructor(private incidentGateway: IncidentGateway) {}

  async getIncidents(): Promise<GetIncidentsResponse> {
    const incidents = await this.incidentGateway.getIncidents();
    return {
      incidents: incidents.map((incident) => ({
        id: incident.id,
        number: incident.number,
        shortDescription: incident.shortDescription,
        description: incident.description,
        status: incident.status,
        priority: incident.priority,
        reporterId: incident.reporterId,
        assigneeId: incident.assigneeId,
        createdAt: toISOString(incident.createdAt),
        updatedAt: toISOString(incident.updatedAt),
        resolvedAt: incident.resolvedAt ? toISOString(incident.resolvedAt) : undefined,
      })),
    };
  }
}
