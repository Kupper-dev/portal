
import { getPodioAppClient } from './podio-sync';

// App IDs from podio_apps_complete.json
const APP_ID_CUSTOMERS = 30429788;
const APP_ID_STUDENTS = 30432041;

interface PodioField {
    external_id: string;
    values: any[];
}

export async function createPodioCustomer(email: string, name: string, auth0Id: string) {
    console.log(`[Podio] Creating Customer: ${email}`);
    try {
        const client = await getPodioAppClient(APP_ID_CUSTOMERS);

        // Construct fields
        const fields: Record<string, any> = {
            'title': name, // 'name' text field usually used as title? Or explicitly 'name'. 
            // In migration, column is 'name'. External ID 'name'.
            // Podio item create expects {'fields': {'external_id': value, ...}}
            'name': name,
            'email': [{ 'type': 'home', 'value': email }], // Email field usually expects specific structure
            'auth0id': auth0Id,
            'type': 'Customer' // assuming this is a category or text field? Migration says 'text'.
            // If it's a category, we might need the ID or exact text option matching.
            // Requirement says: "Create item in Podio Customers App with type = customer."
            // If 'type' is a category, passing string might fail if not exact match or if it requires Option ID.
            // Safe bet: Try passing text. If fails, we catch error.
        };

        const response = await client.request('POST', `/item/app/${APP_ID_CUSTOMERS}/`, {
            fields: fields
        });

        console.log(`[Podio] Customer Created. Item ID: ${response.item_id}`);
        return response.item_id as number;
    } catch (error) {
        console.error('[Podio] Failed to create customer:', error);
        // We do NOT modify return type to throw necessarily, or maybe we do?
        // If critical, throw.
        return null;
    }
}

export async function createPodioStudent(email: string, name: string, auth0Id: string) {
    console.log(`[Podio] Creating Student: ${email}`);
    try {
        const client = await getPodioAppClient(APP_ID_STUDENTS);

        const fields: Record<string, any> = {
            'name': name, // External ID 'name'
            'email': [{ 'type': 'home', 'value': email }],
            'auth0id': auth0Id
        };

        const response = await client.request('POST', `/item/app/${APP_ID_STUDENTS}/`, {
            fields: fields
        });

        console.log(`[Podio] Student Created. Item ID: ${response.item_id}`);
        return response.item_id as number;
    } catch (error) {
        console.error('[Podio] Failed to create student:', error);
        return null;
    }
}
