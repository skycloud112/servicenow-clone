export type IncidentStatus = 'new' | 'in_progress' | 'on_hold' | 'resolved' | 'closed';
export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

export class Incident {
  constructor(
    public readonly id: string,
    public number: string,
    public shortDescription: string,
    public description: string,
    public status: IncidentStatus,
    public priority: IncidentPriority,
    public reporterId: string,
    public assigneeId: string | undefined,
    public createdAt: Date,
    public updatedAt: Date,
    public resolvedAt: Date | undefined,
  ) {}
}
