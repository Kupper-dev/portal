'use server'

import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-edge';
import { createPodioCustomer } from '@/lib/podio-edge';
import { getSupabaseAdmin } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function registerCustomer(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;

    if (!token) {
        // If no token, they shouldn't be here.
        redirect('/api/auth/login');
    }

    const user = await verifyToken(token);
    if (!user || !user.sub || !user.email) {
        // Invalid session
        redirect('/api/auth/login');
    }

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;

    // Optional Company fields
    const companyName = formData.get('companyName') as string;
    const companySize = formData.get('companySize') as string;

    if (!firstName || !lastName || !phone) {
        // Return structured error to client
        return { error: 'Por favor completa todos los campos requeridos.' };
    }

    try {
        const email = user.email as string;
        const auth0Id = user.sub as string;

        // 1. Create in Podio
        // This is the source of truth for the business process.
        const podioItemId = await createPodioCustomer(
            email,
            firstName,
            lastName,
            phone,
            auth0Id,
            companyName || undefined,
            companySize || undefined
        );

        // 2. Create in Supabase (Immediate Link)
        // We do this so the user is immediately "recognized" by identity-linker on next load / dashboard.
        // Even if Podio webhook comes later, the auth0id link is key.
        const supabase = getSupabaseAdmin();
        const fullName = `${firstName} ${lastName}`.trim();

        const { error } = await supabase.from('customers').insert({
            email: email,
            name: fullName,
            phone: phone,
            auth0id: auth0Id,
            type: 1, // Customer
            sync_status: podioItemId ? 'synced' : 'pending',
            podio_item_id: podioItemId || undefined
        });

        if (error) {
            console.error('[RegisterAction] Supabase creation failed:', error);
            // If duplicate, maybe they already exist? 
            // If so, we should probably just link them?
            // But we can assume this is a new registration flow.
            if (error.code === '23505') { // Unique violation
                // If email already exists, try to update it?
                // But let's just proceed to redirect, assuming identity-linker will fix it if it exists.
            }
        }

    } catch (e) {
        console.error('[RegisterAction] Failed:', e);
        return { error: 'Ocurrió un error al registrar. Por favor intenta de nuevo.' };
    }

    redirect('/');
}
