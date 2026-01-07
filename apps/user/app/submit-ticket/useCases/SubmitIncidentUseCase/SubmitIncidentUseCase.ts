import { Incident, IncidentPriority } from '@repo/entities/Incident';
import type { IncidentGateway } from '@repo/gateways/IncidentGateway';
import { uuid } from '@repo/utils/uuid';

export type SubmitIncidentRequest = {
  shortDescription: string;
  description: string;
  priority: IncidentPriority;
  reporterId: string;
};

export type SubmitIncidentResponse = {
  incidentId: string;
  incidentNumber: string;
};

export class SubmitIncidentUseCase {
  constructor(private incidentGateway: IncidentGateway) {}

  async submitIncident(request: SubmitIncidentRequest): Promise<SubmitIncidentResponse> {
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
      undefined,
      now,
      now,
      undefined,
    );

    await this.incidentGateway.createIncident(incident);
    return { incidentId: id, incidentNumber: number };
  }
}
