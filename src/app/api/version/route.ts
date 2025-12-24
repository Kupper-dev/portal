import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.6-patch-package',
        timestamp: new Date().toISOString(),
        message: 'Fixed via patch-package.',
    });
}
