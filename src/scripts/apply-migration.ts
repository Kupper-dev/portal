import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars if needed
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key]) {
            process.env[key.trim()] = value.trim();
        }
    });
}

async function main() {
    // We need the connection string. It was in the generate-migration.ts output or I can construct it.
    // "postgres://postgres.yvbcskdseccjkhuukwgg:[PASS]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
    // Ideally user provided it in env, usually DATABASE_URL?
    // Checking .env
    const connectionString = process.env.DATABASE_URL || 'postgres://postgres.yvbcskdseccjkhuukwgg:Kupper2024!@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

    if (!connectionString) {
        console.error('DATABASE_URL not found.');
        process.exit(1);
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false } // Supabase pooler sometimes needs this
    });

    try {
        await client.connect();
        console.log('Connected to Database.');

        const sqlPath = path.resolve(process.cwd(), 'supabase/migrations/pending_migration.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running migration...');
        await client.query(sql);
        console.log('Migration applied successfully!');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

main();
