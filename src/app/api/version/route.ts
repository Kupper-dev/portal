import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.1-verify-fix',
        timestamp: new Date().toISOString(),
        message: 'If you see this, the deployment has updated.',
    });
}
