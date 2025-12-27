
import { SimplePodioClient } from '../lib/podio-sync';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Load env vars
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !process.env[key]) {
        process.env[key.trim()] = value.trim();
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question: string): Promise<string> {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    const clientId = process.env.PODIO_CLIENT_ID;
    const clientSecret = process.env.PODIO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error('Error: PODIO_CLIENT_ID and PODIO_CLIENT_SECRET must be set in .env');
        process.exit(1);
    }

    console.log('--- Podio Token Generator ---\n');

    // Check if env vars exist for user/pass, else ask
    let username = process.env.PODIO_USERNAME || '';
    let password = process.env.PODIO_PASSWORD || '';

    if (!username) {
        username = await ask('Enter Podio Email: ');
    } else {
        console.log(`Using PODIO_USERNAME from env: ${username}`);
    }

    if (!password) {
        password = await ask('Enter Podio Password: ');
    } else {
        console.log('Using PODIO_PASSWORD from env.');
    }

    const client = new SimplePodioClient({
        authType: 'user',
        clientId,
        clientSecret
    });

    try {
        console.log('\nAuthenticating...');
        // Force type cast or ignore if TS complains about return type (we updated it but script might not know yet without recompile if strictly checked, but tsx handles it)
        const data: any = await client.authenticateWithPassword(username, password);

        console.log('\n✅ Success!\n');
        console.log('Add the following to your .env file:\n');
        console.log(`PODIO_USER_AUTH_TOKEN=${data.refresh_token}`);
        console.log('\n(This is your Refresh Token. Keep it safe.)');

    } catch (err: any) {
        console.error('\nAuthentication Failed:', err.message || err);
    } finally {
        rl.close();
    }
}

main();
