
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-edge';
import { redirect } from 'next/navigation';
import RegisterForm from './register-form';

export const metadata = {
    title: 'Registro - Kupper Portal',
    description: 'Completa tu registro para continuar.'
};

export default async function RegisterPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;

    if (!token) {
        redirect('/auth/login');
    }

    const user = await verifyToken(token) as any;
    if (!user) {
        redirect('/auth/login');
    }

    return (
        <RegisterForm
            initialEmail={user.email}
            initialName={user.name}
            initialPicture={user.picture}
        />
    );
}
