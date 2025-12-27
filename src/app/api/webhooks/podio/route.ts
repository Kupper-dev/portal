import { NextRequest, NextResponse } from 'next/server';
import { handlePodioHookVerification, syncPodioToSupabase } from '@/lib/podio-sync';

// export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        // Podio sends data as application/x-www-form-urlencoded
        const formData = await req.formData();
        const type = formData.get('type') as string;
        const hook_id = formData.get('hook_id') as string;
        const code = formData.get('code') as string;
        const item_id = formData.get('item_id') as string;

        console.log(`Received Podio Webhook: ${type}`, { type, hook_id, code, item_id });


        if (type === 'hook.verify') {
            await handlePodioHookVerification(hook_id, code);
            return NextResponse.json({ message: 'Verified' }, { status: 200 });
        }

        if (type === 'item.create' || type === 'item.update') {
            await syncPodioToSupabase(parseInt(item_id, 10), type);
            return NextResponse.json({ message: 'Synced' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Ignored type' }, { status: 200 });
    } catch (error: any) {
        console.error('Podio Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
