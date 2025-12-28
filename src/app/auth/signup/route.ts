
import { NextRequest } from 'next/server';
import { login } from '@/lib/auth-edge';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    // Force 'portal' login type but with 'signup' screen hint
    return login(request, 'portal', 'signup');
}
