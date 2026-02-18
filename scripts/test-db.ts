
import { db } from "../lib/db";
import { sql } from "drizzle-orm";

async function main() {
    try {
        console.log("Testing database connection...");
        // We can use a simple query. serverless driver returns result structure slightly different depending on usage but drizzle abstracts it.
        // However, for raw execute:
        const result = await db.execute(sql`SELECT now()`);
        console.log("✅ Connection successful. Timestamp:", result.rows ? result.rows[0] : result);
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    }
}

main();
