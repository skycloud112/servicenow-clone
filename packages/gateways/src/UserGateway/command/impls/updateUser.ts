import type pg from 'pg';
import SQL from '@nearform/sql';
import type { User } from '@repo/entities/User';
import { USER_TABLE_NAME, UserTableFieldNames } from '../../../tableUtils/userUtils';

export const updateUser = async (pool: pg.Pool, user: User): Promise<void> => {
  const query = SQL`
    UPDATE ${SQL.unsafe(USER_TABLE_NAME)}
    SET
      ${SQL.unsafe(UserTableFieldNames.email)} = ${user.email},
      ${SQL.unsafe(UserTableFieldNames.display_name)} = ${user.displayName},
      ${SQL.unsafe(UserTableFieldNames.role)} = ${user.role},
      ${SQL.unsafe(UserTableFieldNames.updated_at)} = ${user.updatedAt}
    WHERE ${SQL.unsafe(UserTableFieldNames.id)} = ${user.id}
  `;
  await pool.query(query.text, query.values);
};
