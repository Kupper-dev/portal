
import fs from 'fs/promises';
import path from 'path';

// Manual definition since we might run this in an environment without the full Next.js context
const PODIO_CLIENT_ID = process.env.PODIO_CLIENT_ID || 'portal-2-xd0boq';
const PODIO_CLIENT_SECRET = process.env.PODIO_CLIENT_SECRET || 'YXd7usqqzJb7RjbPKOrBYO7zjJ5CMCUi03NPFiogb8G59k9GYDqVeNdbJ0mJb6rk';

// App Credentials from .env
const APPS = [
    { name: 'Customers', id: 30429788, token: '49a7ff8fe4296151db1717686fd76d85' },
    { name: 'Students', id: 30432041, token: 'b17a172887bc4d7c33c2940771ec56e2' }
];

const PODIO_AUTH_ENDPOINT = 'https://api.podio.com/oauth/token';
const PODIO_API_BASE = 'https://api.podio.com';

async function authenticate(appId: number, appToken: string) {
    const body = new URLSearchParams({
        grant_type: 'app',
        app_id: appId.toString(),
        app_token: appToken,
        client_id: PODIO_CLIENT_ID,
        client_secret: PODIO_CLIENT_SECRET
    });

    const res = await fetch(PODIO_AUTH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    });

    if (!res.ok) {
        throw new Error(`Auth failed for app ${appId}: ${await res.text()}`);
    }

    const data = await res.json();
    return data.access_token;
}

async function getAppDefinition(accessToken: string, appId: number) {
    const res = await fetch(`${PODIO_API_BASE}/app/${appId}`, {
        headers: { Authorization: `OAuth2 ${accessToken}` }
    });

    if (!res.ok) throw new Error(`Get App failed: ${await res.text()}`);
    return await res.json();
}

async function main() {
    console.log('Fetching Podio App Schemas...');

    const results = [];

    for (const app of APPS) {
        console.log(`Authenticating for ${app.name} (${app.id})...`);

        try {
            const token = await authenticate(app.id, app.token);
            console.log(`Fetching definition for ${app.name}...`);

            const appDef = await getAppDefinition(token, app.id);

            // Simplify the output for our schema generation needs
            const simplifiedFields = appDef.fields.map((field: any) => ({
                field_id: field.field_id,
                external_id: field.external_id,
                type: field.type,
                label: field.label,
                config: field.config
            }));

            results.push({
                app_name: app.name,
                app_id: app.id,
                fields: simplifiedFields,
                full_def: appDef
            });

        } catch (err) {
            console.error(`Error processing ${app.name}:`, err);
        }
    }

    const outputPath = path.join(process.cwd(), 'podio_full_schema.json');
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

    console.log(`Schema saved to ${outputPath}`);

    // Also print a summary table
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
