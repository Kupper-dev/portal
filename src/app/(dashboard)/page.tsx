import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Hero, ServicesDetailsAndStatus } from '@/devlink';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;


    // Link Identity is now handled by /auth/post-login middleware redirection
    // access to this page implies session.synced = true

    // Logic to determine User Type from session
    const userType = session?.userType || 'default';

    console.log(`[Dashboard] User Type: ${userType}`);

    switch (userType) {
        case 'VIP':
            return (
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">VIP Dashboard</h1>
                    <ServicesDetailsAndStatus />
                </div>
            );
        case 'Standard':
            return (
                <div className="flex w-full h-screen bg-white">
                    <div className="w-auto h-full z-20">
                        <Sidebar />
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <div className="p-8">
                            <Hero />
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="flex w-full h-screen bg-white">
                    <div className="w-auto h-full z-20">
                        <Sidebar />
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <div className="p-8">
                            <Hero />
                        </div>
                    </div>
                </div>
            );
    }
}
