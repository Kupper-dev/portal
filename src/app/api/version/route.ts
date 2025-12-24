import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.7-force-patch',
        timestamp: new Date().toISOString(),
        message: 'Forced patch in build script.',
    });
}
