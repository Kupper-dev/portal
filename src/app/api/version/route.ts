import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.9-fix-build',
        timestamp: new Date().toISOString(),
        message: 'Added .npmrc to fix build failure.',
    });
}
