import { NextRequest, NextResponse } from 'next/server';
import { handlePodioHookVerification, syncPodioToSupabase } from '@/lib/podio-sync';

// export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, hook_id, code, item_id } = body;

        console.log(`Received Podio Webhook: ${type}`, body);

        if (type === 'hook.verify') {
            await handlePodioHookVerification(hook_id, code);
            return NextResponse.json({ message: 'Verified' }, { status: 200 });
        }

        if (type === 'item.create' || type === 'item.update') {
            await syncPodioToSupabase(item_id, type);
            return NextResponse.json({ message: 'Synced' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Ignored type' }, { status: 200 });
    } catch (error: any) {
        console.error('Podio Webhook Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
