import { logout } from '@/lib/auth-edge';
import { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
    return logout(request);
}
