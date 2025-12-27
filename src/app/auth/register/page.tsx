
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-edge';
import RegisterForm from './register-form';
import ClientRedirect from '@/components/client-redirect';

export const metadata = {
    title: 'Registro - Kupper Portal',
    description: 'Completa tu registro para continuar.'
};

export default async function RegisterPage() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('app_session')?.value;

        if (!token) {
            return <ClientRedirect destination="/app/auth/login" />;
        }

        const user = await verifyToken(token) as any;
        if (!user) {
            return <ClientRedirect destination="/app/auth/login" />;
        }

        return (
            <RegisterForm
                initialEmail={user.email}
                initialName={user.name}
                initialPicture={user.picture}
            />
        );
    } catch (e: any) {
        // Re-throw redirects handled by Next.js
        if (e?.digest?.includes('NEXT_REDIRECT') || e?.message === 'NEXT_REDIRECT') {
            throw e;
        }
        console.error("RegisterPage Error:", e);
        throw e; // Let error.tsx handle it
    }
}
