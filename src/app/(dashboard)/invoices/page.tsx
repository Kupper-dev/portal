
import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PageHero } from '@/devlink';

export default async function InvoicesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    let session = token ? await decryptSession(token) : null;

    if (process.env.NODE_ENV === 'development' && !session) {
        session = {
            auth0Id: 'mock-user-123',
            email: 'developer@kupper.com',
            name: 'Dev User',
            picture: 'https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg',
            flow: 'ready',
            userType: 'admin',
            loginType: 'portal',
        } as AppSession;
    }

    if (!session) {
        redirect('/auth/login');
    }

    return (
        <>
            <PageHero
                heroTitle="Facturas"
                imageHero1="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/67843644ec2796dc2e9c2f6d_Laptop%20icon.svg"
                imageHero2="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/678436441ef58474771acb98_PC%20Icon.svg"
            />
            <div className="page-table">
                <div className="list">
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--_dev---text-gray)' }}>
                        Próximamente
                    </div>
                </div>
            </div>
        </>
    );
}
