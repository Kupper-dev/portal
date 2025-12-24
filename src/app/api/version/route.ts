import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        version: '1.0.4-better-patch',
        timestamp: new Date().toISOString(),
        message: 'Testing nested unenv patch.',
    });
}
