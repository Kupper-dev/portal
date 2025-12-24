import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.2-patched',
        timestamp: new Date().toISOString(),
        message: 'If you see this, the setImmediate patch worked.',
    });
}
