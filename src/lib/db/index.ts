import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

//setting up a PostgreSQL database connection using a library pg (which is the PostgreSQL client for Node.js).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false,
        }
      : false,
  max: 10,
});

//The drizzle() function initializes the ORM by connecting your pool (PostgreSQL connection) with your database schema.
export const db = drizzle(pool, { schema });

//Getting a single client (connection) from the PostgreSQL connection pool so that we can run SQL queries directly on it.
export async function getClient() {
  const client = await pool.connect();
  return client;
}
