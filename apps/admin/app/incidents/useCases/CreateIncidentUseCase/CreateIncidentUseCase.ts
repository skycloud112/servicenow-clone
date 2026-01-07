import { Incident, IncidentPriority } from '@repo/entities/Incident';
import type { IncidentGateway } from '@repo/gateways/IncidentGateway';
import { uuid } from '@repo/utils/uuid';

export type CreateIncidentRequest = {
  shortDescription: string;
  description: string;
  priority: IncidentPriority;
  reporterId: string;
  assigneeId?: string;
};

export type CreateIncidentResponse = {
  incidentId: string;
  incidentNumber: string;
};

export class CreateIncidentUseCase {
  constructor(private incidentGateway: IncidentGateway) {}

  async createIncident(request: CreateIncidentRequest): Promise<CreateIncidentResponse> {
    const id = uuid();
    const number = await this.incidentGateway.getNextIncidentNumber();
    const now = new Date();

    const incident = new Incident(
      id,
      number,
      request.shortDescription,
      request.description,
      'new',
      request.priority,
      request.reporterId,
      request.assigneeId,
      now,
      now,
      undefined,
    );

    await this.incidentGateway.createIncident(incident);
    return { incidentId: id, incidentNumber: number };
  }
}
