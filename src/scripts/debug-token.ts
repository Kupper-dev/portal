import { SimplePodioClient } from '../lib/podio-sync';
import * as fs from 'fs';
import * as path from 'path';

// Load env vars
// ... (same env loading logic)
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !process.env[key]) {
        process.env[key.trim()] = value.trim();
    }
});

const APP_ID = 30429788; // Customers
const CLIENT_ID = process.env.PODIO_CLIENT_ID || 'portal-2-xd0boq';
const CLIENT_SECRET = process.env.PODIO_CLIENT_SECRET || 'YXd7usqqzJb7RjbPKOrBYO7zjJ5CMCUi03NPFiogb8G59k9GYDqVeNdbJ0mJb6rk';
const USER_TOKEN = process.env.PODIO_USER_AUTH_TOKEN;

async function main() {
    console.log('Debugging Token Retrieval...');
    const client = new SimplePodioClient({
        authType: 'user',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    });

    await client.authenticateWithRefreshToken(USER_TOKEN!);
    console.log('Auth success.');

    const endpoints = [
        `/app/${APP_ID}`,
        `/app/${APP_ID}/token`, // Speculative
        `/app/${APP_ID}/setup`  // Speculative
    ];

    for (const ep of endpoints) {
        console.log(`\nTrying ${ep}...`);
        try {
            const res = await client.request('GET', ep);
            // Log if 'token' or 'app_token' is in response
            if (JSON.stringify(res).match(/token/i)) {
                console.log('!!! TOKEN FOUND IN RESPONSE !!!');
                if (res.token) console.log('res.token:', res.token);
                if (res.app_token) console.log('res.app_token:', res.app_token);
                // Deep search
                findToken(res);
            } else {
                console.log('No token found in response keys.');
                // console.log(Object.keys(res));
            }
        } catch (err: any) {
            console.log(`Error: ${err.message || err}`);
        }
    }
}

function findToken(obj: any, path = '') {
    if (!obj || typeof obj !== 'object') return;
    for (const key in obj) {
        if (key.includes('token')) {
            console.log(`Found key '${key}' at ${path}.${key} = ${obj[key]}`);
        }
        if (typeof obj[key] === 'object') {
            findToken(obj[key], `${path}.${key}`);
        }
    }
}

main();
