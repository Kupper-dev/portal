const fs = require('fs');
const path = require('path');
const { SimplePodioClient } = require('../lib/podio-sync'); // Use the exported class
require('dotenv').config();

const OUTPUT_FILE = path.resolve(process.cwd(), 'podio_apps_complete.json');

async function main() {
    console.log('Starting Podio App Discovery...');

    const refreshToken = process.env.PODIO_USER_AUTH_TOKEN;
    if (!refreshToken) {
        console.error('Error: PODIO_USER_AUTH_TOKEN is missing in .env');
        return;
    }

    // CORRECTED CONSTRUCTOR USAGE
    const client = new SimplePodioClient({
        authType: 'user',
        clientId: process.env.PODIO_CLIENT_ID,
        clientSecret: process.env.PODIO_CLIENT_SECRET
    });

    try {
        console.log('Authenticating with User Refresh Token...');
        // Use the dedicated method which handles the API call correctly
        await client.authenticateWithRefreshToken(refreshToken);
        console.log('Authentication successful!');

        const allApps = [];

        // 1. Get Organizations
        console.log('Fetching organizations...');
        const orgs = await client.get('/org/');
        console.log(`Found ${orgs.length} organizations.`);

        for (const org of orgs) {
            console.log(`Checking Org: ${org.name} (ID: ${org.org_id})`);

            // 2. Get Spaces for this Org
            const spaces = await client.get(`/org/${org.org_id}/space/`);
            console.log(`  Found ${spaces.length} spaces.`);

            for (const space of spaces) {
                console.log(`  Checking Space: ${space.name} (ID: ${space.space_id})`);

                // 3. Get Apps for this Space
                const apps = await client.get(`/app/space/${space.space_id}/`);
                console.log(`    Found ${apps.length} apps in space "${space.name}".`);

                for (const app of apps) {
                    console.log(`      - App: ${app.config.name} (ID: ${app.app_id}, Status: ${app.status})`);
                    if (app.status === 'active') {
                        allApps.push({
                            id: app.app_id,
                            name: app.config.name,
                            url_label: app.url_label,
                            space_id: space.space_id,
                            space_name: space.name,
                            org_id: org.org_id
                        });
                    } else {
                        console.log(`      (Skipping inactive app: ${app.config.name})`);
                    }
                }
            }
        }

        console.log(`\nTotal Active Apps Discovered: ${allApps.length}`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allApps, null, 2));
        console.log(`Saved app list to ${OUTPUT_FILE}`);

    } catch (error: any) {
        console.error('Discovery failed:', error.message || error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        } else {
            console.error(error);
        }
    }
}

main();
