import type { Incident } from '@repo/entities/Incident';
import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore';

export const getIncidents = async (incidents: InMemoryIncidentStore): Promise<Incident[]> => {
  const result = Array.from(incidents.values());
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
