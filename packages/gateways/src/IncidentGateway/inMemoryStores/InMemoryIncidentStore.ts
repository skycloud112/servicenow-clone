import type { Incident } from '@repo/entities/Incident';

export type InMemoryIncidentStore = Map<string, Incident>;
