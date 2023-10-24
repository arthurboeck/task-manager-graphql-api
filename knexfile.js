/** @type {import("../../../").Config} */
export default {
    client: 'sqlite3',
    connection: {
      filename: './database/db.sqlite'
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true,
  };