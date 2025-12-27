'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

/**
 * Optimistic Write: Create Customer
 * 1. Write to Supabase (Pending)
 * 2. Trigger Sync (Push to Podio)
 */
export async function createCustomerOptimistic(data: { name: string; email: string; user_id: string }) {
    const supabase = getSupabaseAdmin();

    // 1. Write to Supabase
    const { data: record, error } = await supabase.from('customers').insert({
        name: data.name,
        email: data.email,
        auth0id: data.user_id, // Link immediately (Correct column name)
        type: 1, // Default Customer
        sync_status: 'pending'
    }).select().single();

    if (error) {
        throw new Error(error.message);
    }

    // 2. Trigger Background Sync (Simulated for Edge)
    // In a real Edge environment, we might use a Queue binding or just await this if fast enough.
    // For "Supabase-First", we can fire and forget, OR rely on a separate Cron process checking 'pending' rows.
    // Let's attempt a direct push or log it.
    await pushToPodio(record.id, 'customers');

    revalidatePath('/dashboard');
    return record;
}

async function pushToPodio(recordId: string, table: string) {
    console.log(`[Sync Action] Pushing ${table} ID ${recordId} to Podio...`);
    // Logic: 
    // 1. Fetch Supabase Record
    // 2. Map to Podio Fields
    // 3. PodioClient.createItem()
    // 4. Update Supabase with podio_item_id + sync_status='synced'
}
