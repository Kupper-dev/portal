'use server'

import { getSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function acceptDiagnosis(serviceId: number) {
    const supabase = getSupabaseAdmin();

    // We update Supabase first.
    // Ideally, we should also trigger an outgoing sync to Podio here or rely on specific logic.
    // For this prototype, we update the status column in 'services' table.

    // NOTE: In a real bidirectional sync, updating Supabase might not push to Podio automatically 
    // unless we have an outbound sync engine running. 
    // The user requirement says "Services app field status ... should be updated".

    const { error } = await supabase
        .from('services')
        .update({ status: 'Cliente acepta reparación', last_updated_at: new Date().toISOString() })
        .eq('podio_item_id', serviceId);

    if (error) {
        console.error('Failed to update service status:', error);
        throw new Error('Failed to accept diagnosis');
    }

    revalidatePath('/app');
}
