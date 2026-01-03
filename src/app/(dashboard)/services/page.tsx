
import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Header } from '@/devlink';
import { getUserServiceData } from '@/lib/data-service';
import ServicesTableWrapper from './ServicesTableWrapper';
import { redirect } from 'next/navigation';

export default async function ServicesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/auth/login');
    }

    // Fetch service data
    const serviceItems = await getUserServiceData();
    const userImage = session.picture || "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    return (
        <div className="dashboard_section">
            <Sidebar />
            <Header
                userProfilePicture={{ src: userImage }}
                userProfileLink={{ href: '/profile' }}
                userLogOut={{ href: '/app/auth/logout' }}
            />
            {/* Main Content Area */}
            <div className="dashboard_content">
                {/* 
                   We reuse 'dashboard_content' or similar class if it exists in your global css/DevLink 
                   to apply correct padding/margin next to sidebar.
                   For now using a generic div, but ideally this matches the layout structure.
                */}
                <div className="w-layout-blockcontainer container w-container">
                    <ServicesTableWrapper items={serviceItems || []} />
                </div>
            </div>
        </div>
    );
}
