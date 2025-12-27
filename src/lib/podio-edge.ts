
import { getPodioAppClient } from './podio-sync';

// App IDs from podio_apps_complete.json
const APP_ID_CUSTOMERS = 30429788;
const APP_ID_STUDENTS = 30432041;

interface PodioField {
    external_id: string;
    values: any[];
}

export async function createPodioCustomer(
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    auth0Id: string,
    companyName?: string,
    companySize?: string
) {
    console.log(`[Podio] Creating Customer: ${email}`);
    try {
        const client = await getPodioAppClient(APP_ID_CUSTOMERS);

        // Construct Name
        const fullName = `${firstName} ${lastName}`.trim();

        // Construct fields
        const fields: Record<string, any> = {
            'name': fullName, // Main Name/Title
            'recipient': firstName, // 'recipient' column exists, mapping First Name here? Or just 'name' again?
            // Actually 'recipient' might be contact person if 'name' is Company Schema? 
            // But 'type' = 1 (Customer). Let's stick to 'name' as main.

            'email': [{ 'type': 'home', 'value': email }],
            'phone': [{ 'type': 'mobile', 'value': phone }], // Phone field structure
            'auth0id': auth0Id,
            'type': 1 // Customer (Option ID: 1)
        };

        if (companyName) {
            // "empresa" or "company"
            fields['empresa'] = companyName;
            // Note: If 'empresa' is not the correct external ID, this field will be ignored or cause error.
            // Using 'organization' or 'company_name' might be safer if we knew.
            // Given the lack of strict schema, we try 'empresa' (common in Spanish apps).
        }

        if (companySize) {
            // "tamano" or "size"
            // If it's a category, we need the option ID ideally, but text might work if it matches exactly.
            // We'll skip for now if unsure to avoid blocking creation.
            // fields['tamano'] = companySize;
        }

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

export async function updatePodioCustomer(itemId: number, updates: Record<string, any>) {
    console.log(`[Podio] Updating Customer Item ${itemId}`);
    try {
        const client = await getPodioAppClient(APP_ID_CUSTOMERS);

        // Ensure auth0id is properly formatted if passed
        // Note: updates keys should be external_ids

        await client.request('PUT', `/item/${itemId}`, {
            fields: updates
        });

        console.log(`[Podio] Customer Item ${itemId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`[Podio] Failed to update customer ${itemId}:`, error);
        return false;
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

export async function updatePodioStudent(itemId: number, updates: Record<string, any>) {
    console.log(`[Podio] Updating Student Item ${itemId}`);
    try {
        const client = await getPodioAppClient(APP_ID_STUDENTS);

        await client.request('PUT', `/item/${itemId}`, {
            fields: updates
        });

        console.log(`[Podio] Student Item ${itemId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`[Podio] Failed to update student ${itemId}:`, error);
        return false;
    }
}
