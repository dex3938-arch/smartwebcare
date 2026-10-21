import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DIRECT_URL or DATABASE_URL environment variable is required.");
  process.exit(1);
}

async function main() {
  console.log("Connecting to Postgres...");
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected successfully!");

    const schemaPath = path.resolve(__dirname, "../supabase/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");

    console.log("Applying schema.sql...");
    await client.query(sql);
    console.log("Schema applied successfully!");

    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log("Public tables in database:", tablesRes.rows.map(r => r.table_name));

    const policiesRes = await client.query(`
      SELECT tablename, policyname, cmd 
      FROM pg_policies 
      WHERE schemaname = 'public';
    `);
    console.log("RLS policies configured:", policiesRes.rows);

  } catch (err) {
    console.error("Error executing schema:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
