import { Incident, IncidentStatus, IncidentPriority } from './Incident.js';

export type CreateDummyIncidentParams = {
  id?: string;
  number?: string;
  shortDescription?: string;
  description?: string;
  status?: IncidentStatus;
  priority?: IncidentPriority;
  reporterId?: string;
  assigneeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  resolvedAt?: Date;
};

export const createDummyIncident = (params: CreateDummyIncidentParams = {}): Incident => {
  const now = new Date();
  return new Incident(
    params.id ?? '1',
    params.number ?? 'INC0001001',
    params.shortDescription ?? 'Test Incident',
    params.description ?? 'Test incident description',
    params.status ?? 'new',
    params.priority ?? 'medium',
    params.reporterId ?? 'user-1',
    params.assigneeId,
    params.createdAt ?? now,
    params.updatedAt ?? now,
    params.resolvedAt,
  );
};
