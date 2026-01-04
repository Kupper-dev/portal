
import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Header } from '@/devlink';
import { redirect } from 'next/navigation';

export default async function WarrantiesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/auth/login');
    }

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
                <div className="main-grid">
                    <div className="module">
                        <div className="table-header">
                            <h4 className="no_space_bottom">Garantías</h4>
                        </div>
                        {/* Content goes here */}
                        <div className="table-content">
                            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                Próximamente
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
