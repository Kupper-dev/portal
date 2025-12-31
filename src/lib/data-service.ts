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

    if (!session || !session.internalId) {
        return [];
    }

    const userId = parseInt(session.internalId);
    const supabase = getSupabaseAdmin();

    // 1. Fetch All Services for this user
    const { data: services, error: serviceError } = await supabase
        .from('services')
        .select('*')
        .contains('customer', [userId])
        .order('last_updated_at', { ascending: false });

    if (serviceError) {
        console.error('Error fetching services:', serviceError);
        return [];
    }

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
