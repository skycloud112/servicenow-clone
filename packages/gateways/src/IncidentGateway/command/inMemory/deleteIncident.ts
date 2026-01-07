import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore';

export const deleteIncident = async (incidents: InMemoryIncidentStore, id: string): Promise<void> => {
  incidents.delete(id);
};
