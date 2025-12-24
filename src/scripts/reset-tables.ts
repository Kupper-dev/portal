
import dotenv from 'dotenv';
import path from 'path';
import { Client } from 'pg';
import { PODIO_APPS } from '../lib/generated-podio-config';

// Load env vars
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

async function resetTables() {
    console.log('Starting full reset (DROP) of Supabase tables...');

    const connectionString = process.env.DATABASE_URL || 'postgres://postgres.yvbcskdseccjkhuukwgg:Kupper2024!@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

    if (!connectionString) {
        console.error('DATABASE_URL not found.');
        process.exit(1);
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to Database.');

        for (const app of PODIO_APPS) {
            const tableName = app.name.replace(/-/g, '_').toLowerCase();
            console.log(`Dropping table: ${tableName} (App: ${app.name})`);

            try {
                // CASCADE is important to remove foreign keys if any
                await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
                console.log(`Successfully dropped ${tableName}.`);
            } catch (err: any) {
                console.error(`Error dropping ${tableName}:`, err.message);
            }
        }

        console.log('All tables dropped.');
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await client.end();
    }
}

resetTables().catch(console.error);
