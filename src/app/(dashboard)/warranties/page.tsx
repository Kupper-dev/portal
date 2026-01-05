import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Header } from '@/devlink';
import { PortalSidebar } from '@/components/PortalSidebar';
import { redirect } from 'next/navigation';
import WarrantiesTableWrapper from './WarrantiesTableWrapper';

import { getUserWarrantiesData } from '@/lib/data-service';

export default async function WarrantiesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/auth/login');
    }

    const userImage = session.picture || "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    // Fetch warranties data
    const warranties = await getUserWarrantiesData();

    return (
        <div className="dashboard_section">
            <PortalSidebar />
            <Header
                userProfilePicture={{ src: userImage }}
                userProfileLink={{ href: '/profile' }}
                userLogOut={{ href: '/app/auth/logout' }}
            />
            {/* Main Content Area */}
            <div className="dashboard_content">
                <WarrantiesTableWrapper items={warranties} />
            </div>
        </div>
    );
}
