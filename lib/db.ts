import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL not set in .env");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
