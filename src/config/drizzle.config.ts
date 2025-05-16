/* import type { Config } from "drizzle-kit";

// 直接用 process.env 前先檢查一下
if (!process.env.NEXT_DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not set in .env file");
}

const config: Config = {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg", // 👈 PostgreSQL Driver
  dbCredentials: {
    connectionString: process.env.NEXT_DATABASE_URL, // type safe
  },
};

export default config;
 */
