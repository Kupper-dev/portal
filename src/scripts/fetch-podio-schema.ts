import { SimplePodioClient } from '../lib/podio-sync';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars
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

// App Credentials from .env or manual fallback
const PODIO_CLIENT_ID = process.env.PODIO_CLIENT_ID || 'portal-2-xd0boq';
const PODIO_CLIENT_SECRET = process.env.PODIO_CLIENT_SECRET || 'YXd7usqqzJb7RjbPKOrBYO7zjJ5CMCUi03NPFiogb8G59k9GYDqVeNdbJ0mJb6rk';
const PODIO_USER_AUTH_TOKEN = process.env.PODIO_USER_AUTH_TOKEN;

async function main() {
    console.log('Fetching Podio App Schemas with User Token...');

    if (!PODIO_USER_AUTH_TOKEN) {
        console.error('Missing PODIO_USER_AUTH_TOKEN in .env');
        process.exit(1);
    }

    const appsListPath = path.resolve(process.cwd(), 'podio_apps_complete.json');
    if (!fs.existsSync(appsListPath)) {
        console.error('podio_apps_complete.json not found. Run discover-apps.ts first.');
        process.exit(1);
    }
    const apps = JSON.parse(fs.readFileSync(appsListPath, 'utf8'));

    const client = new SimplePodioClient({
        authType: 'user',
        clientId: PODIO_CLIENT_ID,
        clientSecret: PODIO_CLIENT_SECRET
    });

    console.log(`Authenticating with User Token...`);
    await client.authenticateWithRefreshToken(PODIO_USER_AUTH_TOKEN);
    console.log('Authentication successful.');

    const results = [];

    for (const app of apps) {
        console.log(`Fetching definition for ${app.name} (${app.id})...`);
        try {
            const appDef = await client.request('GET', `/app/${app.id}?type=full`);

            // Simplify the output for our schema generation needs
            const simplifiedFields = appDef.fields.map((field: any) => ({
                field_id: field.field_id,
                external_id: field.external_id,
                type: field.type,
                label: field.label,
                config: field.config
            }));

            // Use sanitized name as key if possible, or just store it in the object
            results.push({
                app_name: app.name,
                app_id: app.id,
                fields: simplifiedFields,
                full_def: appDef
            });

        } catch (err) {
            console.error(`Error fetching app ${app.name}:`, err);
        }
    }

    const outputPath = path.join(process.cwd(), 'podio_full_schema.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`Schema saved to ${outputPath}`);

    // Summary
    results.forEach(app => {
        console.log(`\n--- ${app.app_name} ---`);
        console.table(app.fields.map((f: any) => ({
            id: f.field_id,
            external_id: f.external_id,
            type: f.type,
            label: f.label
        })));
    });
}

main().catch(console.error);
