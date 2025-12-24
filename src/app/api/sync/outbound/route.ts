import { NextResponse } from 'next/server';
import { syncPendingItems } from '@/lib/podio-sync';

// Fetch-based custom client works in Edge
// export const runtime = 'edge';

export async function POST() {
    try {
        const result = await syncPendingItems();
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('Outbound Sync Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
