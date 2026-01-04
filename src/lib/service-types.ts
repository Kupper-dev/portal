export interface ServiceItem {
    podio_item_id: number;
    podio_formatted_id: string;
    date: string; // "2025-12-24T00:00:00+00:00"
    last_updated_at: string;
    customer: number[];
    device: number[]; // Array of device item IDs
    status: string; // "Dispositivo en revision", "Enviar diagnostico", etc.
    servicetype: string; // Request or issue
    observations: string;
    type: string;
    databackup: string;
    poweradapter: string;
    accessories: string;
    diagnosis: string;
    aproxcompletationdate?: string;
    requestorissue?: string;
    issuereformulation?: string;
    price?: number;
    advancepayment: string; // Maybe price?
    // Timestamps from Podio (External IDs sanitized)
    datereceived?: string;
    datecheckupstart?: string;
    datediagnosed?: string;
    date_diagnosis?: string; // from 'date-diagnosis'
    datepartsordered?: string;
    daterepairstart?: string;
    daterepairready?: string;
    datedevicedelivered?: string;
    serviceorsparepart?: number[];
}

export interface DeviceItem {
    podio_item_id: number;
    brandmodel: string;
    serial: string;
}

export interface WarrantyItem {
    podio_item_id: number;
    description: string;
    quantity: number;
    warranty: string; // e.g., "1 year", "6 months"
    datestart: string;
    dateends: string;
    observations: string;
    status?: string; // Derived status
    validity?: string; // Derived validity text
}

export interface TicketItem {
    podio_item_id: number;
    planadministrator: number[]; // Array of customer IDs
    serviceorsparepart?: number[];
}

// Helper to format date
export function formatDate(isoString: string | null) {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('es-MX', { year: '2-digit', month: '2-digit', day: '2-digit' });
}

export function formatTime(isoString: string | null) {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}
