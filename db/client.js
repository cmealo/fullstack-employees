// db/client.js --
import pg from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing. Run with --env-file=.env or fix your .env"
  );
}

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

export default db;
