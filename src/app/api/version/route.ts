import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.5-build-patch',
        timestamp: new Date().toISOString(),
        message: 'Patching via build script.',
    });
}
