import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.1.0-fresh-lockfile',
        timestamp: new Date().toISOString(),
        message: 'Fresh lockfile + .npmrc + 15.1.4',
    });
}
