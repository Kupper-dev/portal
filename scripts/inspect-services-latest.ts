
import * as fs from 'fs';
import * as path from 'path';

// Manual env loader
function loadEnv(filePath: string) {
    if (fs.existsSync(filePath)) {
        console.log(`Loading env from ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf-8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // strip quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    } else {
        console.log(`File: ${filePath} (Skipped/Not Found)`);
    }
}

// Load ECV vars FIRST
loadEnv(path.resolve(process.cwd(), '.env'));
loadEnv(path.resolve(process.cwd(), '.env.local'));
loadEnv(path.resolve(process.cwd(), 'podio_tokens.env'));

async function main() {
    const APP_ID = 30429812; // Services App
    console.log(`Fetching structure for App ID: ${APP_ID}...`);

    // Debug
    console.log('PODIO_CLIENT_ID length:', process.env.PODIO_CLIENT_ID?.length);
    console.log('PODIO_TOKEN_SERVICES length:', process.env.PODIO_TOKEN_SERVICES?.length);

    try {
        // Dynamic import to ensure process.env is populated first
        const { getPodioAppClient } = await import('../src/lib/podio-sync');

        const client = await getPodioAppClient(APP_ID);
        const appDef = await client.request('GET', `/app/${APP_ID}`);

        console.log(`\nApp Name: ${appDef.config.name}`);
        console.log(`Fields:`);
        appDef.fields.forEach((f: any) => {
            console.log(` - [${f.field_id}] "${f.label}" (external_id: ${f.external_id}, type: ${f.type})`);
            if (f.type === 'category') {
                console.log(`   Options:`);
                f.config.settings.options.forEach((o: any) => {
                    console.log(`     - ID: ${o.id}, Text: "${o.text}"`);
                });
            }
        });

    } catch (error) {
        console.error('Error fetching app structure:', error);
    }
}

main();
