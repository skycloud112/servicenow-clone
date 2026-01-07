import type pg from 'pg';
import SQL from '@nearform/sql';
import type { User } from '@repo/entities/User';
import { USER_TABLE_NAME, UserTableFieldNames } from '../../../tableUtils/userUtils';

export const createUser = async (pool: pg.Pool, user: User): Promise<void> => {
  const query = SQL`
    INSERT INTO ${SQL.unsafe(USER_TABLE_NAME)} (
      ${SQL.unsafe(UserTableFieldNames.id)},
      ${SQL.unsafe(UserTableFieldNames.email)},
      ${SQL.unsafe(UserTableFieldNames.display_name)},
      ${SQL.unsafe(UserTableFieldNames.role)},
      ${SQL.unsafe(UserTableFieldNames.created_at)},
      ${SQL.unsafe(UserTableFieldNames.updated_at)}
    ) VALUES (
      ${user.id},
      ${user.email},
      ${user.displayName},
      ${user.role},
      ${user.createdAt},
      ${user.updatedAt}
    )
  `;
  await pool.query(query.text, query.values);
};
