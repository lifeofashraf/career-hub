import "dotenv/config";
import { db } from "../src/lib/db";

async function main() {
    console.log("Testing DB connection...");
    try {
        const userCount = await db.user.count();
        console.log("Successfully connected to DB!");
        console.log("User count:", userCount);
    } catch (error) {
        console.error("DB Connection failed:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
