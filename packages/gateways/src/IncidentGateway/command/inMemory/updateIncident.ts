import { Incident } from '@repo/entities/Incident';
import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore.js';

export const updateIncident = async (
  incidents: InMemoryIncidentStore,
  incident: Incident,
): Promise<void> => {
  const cloned = new Incident(
    incident.id,
    incident.number,
    incident.shortDescription,
    incident.description,
    incident.status,
    incident.priority,
    incident.reporterId,
    incident.assigneeId,
    incident.createdAt,
    incident.updatedAt,
    incident.resolvedAt,
  );
  incidents.set(cloned.id, cloned);
};
