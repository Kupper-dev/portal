import { getSupabaseAdmin } from './supabase';
import { decryptSession } from './auth-edge';
import { cookies } from 'next/headers';
import { ServiceItem, DeviceItem } from './service-types';

// Re-export specific things if needed, but better to import from service-types directly in other files.

// Statuses considered "Finished"
const FINISHED_STATUSES = ["Dispositivo entregado", "Dispositivo entregado sin reparar"];

export async function getUserServiceData() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    console.log('[DataService] Session:', session ? 'Found' : 'Missing');
    if (session) console.log('[DataService] Internal ID:', session.internalId);

    if (!session || !session.internalId) {
        console.warn('[DataService] No valid session or internalId');
        return [];
    }

    const userId = parseInt(session.internalId);

    const supabase = getSupabaseAdmin();

    // 1. Resolve Podio Item ID from Internal ID (Supabase PK)
    const table = session.userType === 'student' ? 'students' : 'customers';

    const { data: userRecord, error: userError } = await supabase
        .from(table)
        .select('podio_item_id')
        .eq('id', userId)
        .single();

    if (userError || !userRecord || !userRecord.podio_item_id) {
        console.warn('[DataService] Could not resolve Podio ID for user:', userId, userError);
        return [];
    }

    const podioId = userRecord.podio_item_id;
    console.log(`[DataService] Resolved Podio ID: ${podioId} for Internal ID: ${userId}`);

    // 2. Fetch All Services for this user using Podio ID
    // Note: We MUST stringify the array for .contains() to work correctly with this column/client version.
    const { data: services, error: serviceError } = await supabase
        .from('services')
        .select('*')
        .contains('customer', JSON.stringify([podioId]))
        .order('last_updated_at', { ascending: false });

    if (serviceError) {
        console.error('Error fetching services:', serviceError);
        return [];
    }

    console.log(`[DataService] Services found: ${services?.length}`);

    if (!services || services.length === 0) {
        return [];
    }

    // 2. Apply Filtering Logic
    // "if the status equals ... in all of the services ... then only the last service should be rendered"
    const allFinished = services.every((s: ServiceItem) =>
        s.status && FINISHED_STATUSES.includes(s.status)
    );

    let servicesToShow = services;
    if (allFinished) {
        // Only show the most recent one (index 0 due to sort)
        servicesToShow = [services[0]];
    }

    // 3. Batch Fetch Related Devices
    const deviceIds = servicesToShow
        .map((s: ServiceItem) => s.device && s.device.length > 0 ? s.device[0] : null)
        .filter((id): id is number => id !== null);

    // Dedup IDs just in case
    const uniqueDeviceIds = Array.from(new Set(deviceIds));

    let devices: DeviceItem[] = [];
    if (uniqueDeviceIds.length > 0) {
        const { data: fetchedDevices, error: deviceError } = await supabase
            .from('devices')
            .select('*')
            .in('podio_item_id', uniqueDeviceIds);

        if (!deviceError && fetchedDevices) {
            devices = fetchedDevices as DeviceItem[];
        }
    }

    // 4. Map Results
    return servicesToShow.map((service: ServiceItem) => {
        const deviceId = service.device && service.device.length > 0 ? service.device[0] : null;
        const device = devices.find(d => d.podio_item_id === deviceId) || null;
        return { service, device };
    });
}
