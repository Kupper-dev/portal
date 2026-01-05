import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Hero, Header } from '@/devlink';
import ServiceStatusWrapper from './ServiceStatusWrapper';
import { getUserServiceData } from '@/lib/data-service';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/auth/login');
    }

    const userName = (session.name || session.email.split('@')[0]).split(' ')[0];

    // Fetch service data (no try/catch needed as function handles errors gracefully)
    // Fetch service data
    const serviceItems = await getUserServiceData();

    // Use session picture or placeholder
    const userImage = session.picture || "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    return (
        <div className="dashboard_section">
            <Sidebar
                sIdebarServices={{ href: "/app/services" }}
                dashboard={{ href: "/app" }}
                warranties={{ href: "/app/warranties" }}
                devices={{ href: "/app/devices" }}
                invoices={{ href: "/app/invoices" }}
                approvals={{ href: "/app/approvals" }}
            />
            <Header
                userProfilePicture={{ src: userImage }}
                userProfileLink={{ href: '/profile' }}
                userLogOut={{ href: '/app/auth/logout' }}
            />
            <Hero
                heroRecipientName={userName}
            />
            <ServiceStatusWrapper items={serviceItems || []} />
        </div>
    );
}
