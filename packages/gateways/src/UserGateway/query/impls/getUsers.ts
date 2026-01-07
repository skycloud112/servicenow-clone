import type pg from 'pg';
import SQL from '@nearform/sql';
import { User, UserRole } from '@repo/entities/User';
import { USER_TABLE_NAME, UserTableFieldNames } from '../../../tableUtils/userUtils';

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
};

export const getUsers = async (pool: pg.Pool): Promise<User[]> => {
  const query = SQL`
    SELECT
      ${SQL.unsafe(UserTableFieldNames.id)},
      ${SQL.unsafe(UserTableFieldNames.email)},
      ${SQL.unsafe(UserTableFieldNames.display_name)},
      ${SQL.unsafe(UserTableFieldNames.role)},
      ${SQL.unsafe(UserTableFieldNames.created_at)},
      ${SQL.unsafe(UserTableFieldNames.updated_at)}
    FROM ${SQL.unsafe(USER_TABLE_NAME)}
    ORDER BY ${SQL.unsafe(UserTableFieldNames.created_at)} DESC
  `;
  const result = await pool.query<UserRow>(query.text, query.values);
  return result.rows.map(mapRowToUser);
};

const mapRowToUser = (row: UserRow): User => {
  return new User(row.id, row.email, row.display_name, row.role, row.created_at, row.updated_at);
};
