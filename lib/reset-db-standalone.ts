import { Pool } from "pg";

const connectionString = 'postgresql://neondb_owner:npg_tPfejMr8D5zV@ep-wandering-night-ait7i85l-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});

async function reset() {
    try {
        console.log("🗑️ Dropping all tables...");
        const client = await pool.connect();

        // Drop tables
        await client.query('DROP TABLE IF EXISTS "wishlist" CASCADE');
        await client.query('DROP TABLE IF EXISTS "project_options" CASCADE');
        await client.query('DROP TABLE IF EXISTS "team_members" CASCADE');
        await client.query('DROP TABLE IF EXISTS "category_option_values" CASCADE');
        await client.query('DROP TABLE IF EXISTS "categories" CASCADE');
        await client.query('DROP TABLE IF EXISTS "projects" CASCADE');
        await client.query('DROP TABLE IF EXISTS "listings" CASCADE');
        await client.query('DROP TABLE IF EXISTS "users" CASCADE');
        await client.query('DROP TABLE IF EXISTS "drizzle_migrations" CASCADE'); // Also drop migrations table to force fresh start

        console.log("✅ All tables dropped.");
        client.release();
    } catch (err) {
        console.error("❌ Failed to drop tables:", err);
    } finally {
        await pool.end();
    }
}

reset();
