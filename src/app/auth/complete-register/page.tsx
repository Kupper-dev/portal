
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/auth-edge';
import { redirect } from 'next/navigation';
import RegisterFormWrapper from './RegisterFormWrapper';

// We force dynamic because we read cookies
export const dynamic = 'force-dynamic';

export default async function CompleteRegisterPage() {
    console.log('[RegisterPage] Loading...');
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    console.log(`[RegisterPage] Token present: ${!!token}`);

    const session = token ? await decryptSession(token) : null;
    console.log(`[RegisterPage] Session decrypted: ${!!session}, Flow: ${session?.flow}`);

    if (!session) {
        console.log('[RegisterPage] No session found, redirecting to login');
        redirect('/app/auth/login');
    }

    if (session.flow === 'ready') {
        // If already ready, no need to be here
        console.log('[RegisterPage] Flow is ready, redirecting to dashboard');
        redirect('/app');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/* We can wrap it in a container if needed or let DevLink handle layout */}
            <RegisterFormWrapper
                initialEmail={session.email}
                loginType={session.loginType}
            />
        </div>
    );
}
