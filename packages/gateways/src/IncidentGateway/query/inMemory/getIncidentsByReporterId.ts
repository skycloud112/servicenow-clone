import type { Incident } from '@repo/entities/Incident';
import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore.js';

export const getIncidentsByReporterId = async (
  incidents: InMemoryIncidentStore,
  reporterId: string,
): Promise<Incident[]> => {
  const result = Array.from(incidents.values()).filter((i) => i.reporterId === reporterId);
  return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
