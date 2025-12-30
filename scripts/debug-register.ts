
import { EncryptJWT } from 'jose';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const AUTH0_SECRET = process.env.AUTH0_SECRET || process.env.AUTH0_CLIENT_SECRET || '';
const SECRET_KEY = new TextEncoder().encode(AUTH0_SECRET.padEnd(32, '0').substring(0, 32));

async function encryptSession(payload: any) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 86400; // 24 hours

    return new EncryptJWT({ ...payload })
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .encrypt(SECRET_KEY);
}

async function run() {
    console.log('--- Starting Debug Registration Script ---');

    if (!AUTH0_SECRET) {
        console.error('ERROR: AUTH0_SECRET is missing from .env');
        process.exit(1);
    }

    // 1. Generate Fake Session
    const mockSession = {
        auth0Id: 'auth0|debug_test_user_123',
        email: 'debug_test@example.com',
        name: 'Debug User',
        flow: 'onboarding_required',
        loginType: 'portal'
    };

    console.log('Mocking Session:', mockSession);
    const token = await encryptSession(mockSession);
    console.log('Session Token Full:', token);

    // 2. Prepare Request Payload
    const payload = {
        name: "Debug User FullName",
        surname: "Tester", // Check if 'surname' is handled in route or just name
        companyName: "Debug Inc",
        phone: "5551234567",
        employees: "1-10"
    };

    // 3. Request URL
    // Ensure this matches your local dev server port
    const baseUrl = 'http://localhost:3001';
    const endpoint = `${baseUrl}/app/api/auth/register`;

    console.log(`Sending POST to ${endpoint}...`);

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `app_session=${token}`
            },
            body: JSON.stringify(payload)
        });

        console.log(`Response Status: ${res.status} ${res.statusText}`);

        const response = await res.json(); // Changed from res.text() to res.json()
        console.log('Response Body:', response); // Log the parsed JSON object

        if (response.success && response.redirect === '/') {
            console.log('SUCCESS: API processed request.');
        } else {
            console.log('FAILED: Unexpected response:', response);
        }

    } catch (err) {
        console.error('Network/Fetch Error:', err);
    }
}

run();
