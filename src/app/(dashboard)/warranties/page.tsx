import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Header } from '@/devlink';
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
            <Sidebar
                sIdebarServices={{ href: "/services" }}
                dashboard={{ href: "/" }}
                warranties={{ href: "/warranties" }}
                devices={{ href: "/devices" }}
                invoices={{ href: "/invoices" }}
                approvals={{ href: "/approvals" }}
            />
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
