import type { InMemoryIncidentStore } from '../../inMemoryStores/InMemoryIncidentStore.js';

export const deleteIncident = async (incidents: InMemoryIncidentStore, id: string): Promise<void> => {
  incidents.delete(id);
};
