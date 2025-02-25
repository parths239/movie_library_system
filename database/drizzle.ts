// import config from "@/lib/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(config.env.databaseUrl);

// export const db = drizzle({ client: sql, casing: "snake_case" });
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import  config  from "@/lib/config";

console.log(config.env.databaseUrl);
console.log(process.env.DATABASE_URL);

const sql = neon(config.env.databaseUrl);

export const db = drizzle({ client: sql, casing: "snake_case" });