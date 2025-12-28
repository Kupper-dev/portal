
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/auth-edge';
import { redirect } from 'next/navigation';
import RegisterFormWrapper from './RegisterFormWrapper';

// We force dynamic because we read cookies
export const dynamic = 'force-dynamic';

export default async function CompleteRegisterPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/app/auth/login');
    }

    if (session.flow === 'ready') {
        // If already ready, no need to be here
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
