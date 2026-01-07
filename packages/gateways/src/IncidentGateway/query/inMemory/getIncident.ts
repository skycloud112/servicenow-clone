import type { Incident } from '@repo/entities/Incident';
import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore';

export const getIncident = async (
  incidents: InMemoryIncidentStore,
  id: string,
): Promise<Incident | undefined> => {
  return incidents.get(id);
};
