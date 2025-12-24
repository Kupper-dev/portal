import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.8-comment-out',
        timestamp: new Date().toISOString(),
        message: 'Commented out polyfill assignments.',
    });
}
