import { db } from "./db";
import { sql } from "drizzle-orm";

async function reset() {
    try {
        console.log("🗑️ Dropping all tables...");

        // Drop tables in correct order due to foreign keys
        await db.execute(sql`DROP TABLE IF EXISTS "wishlist" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "project_options" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "team_members" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "category_option_values" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "categories" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "projects" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "listings" CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE`);

        console.log("✅ All tables dropped.");
    } catch (err) {
        console.error("❌ Failed to drop tables:", err);
    }
}

reset();
