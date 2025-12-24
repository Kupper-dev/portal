import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.3-downgrade-compat',
        timestamp: new Date().toISOString(),
        message: 'Testing old compatibility flags.',
    });
}
