import type pg from 'pg';

export const USER_TABLE_NAME = 'app_user';

export const UserTableFieldNames = {
  id: 'id',
  email: 'email',
  display_name: 'display_name',
  role: 'role',
  created_at: 'created_at',
  updated_at: 'updated_at',
} as const;

export const createUserTable = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DROP TABLE IF EXISTS ${USER_TABLE_NAME} CASCADE`);
  await pool.query(`
    CREATE TABLE ${USER_TABLE_NAME} (
      ${UserTableFieldNames.id} TEXT PRIMARY KEY,
      ${UserTableFieldNames.email} TEXT NOT NULL UNIQUE,
      ${UserTableFieldNames.display_name} TEXT NOT NULL,
      ${UserTableFieldNames.role} TEXT NOT NULL DEFAULT 'user',
      ${UserTableFieldNames.created_at} TIMESTAMPTZ NOT NULL,
      ${UserTableFieldNames.updated_at} TIMESTAMPTZ NOT NULL
    )
  `);
  await pool.query(`
    CREATE INDEX idx_user_email ON ${USER_TABLE_NAME}(${UserTableFieldNames.email})
  `);
};

export const deleteAllUsers = async (pool: pg.Pool): Promise<void> => {
  await pool.query(`DELETE FROM ${USER_TABLE_NAME}`);
};
