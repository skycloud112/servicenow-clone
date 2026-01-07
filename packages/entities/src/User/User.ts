export type UserRole = 'admin' | 'user';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public displayName: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
