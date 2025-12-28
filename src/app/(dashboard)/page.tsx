import { verifyToken } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { linkUserIdentity } from "@/lib/identity-linker";
import { Sidebar, Hero, ServicesDetailsAndStatus } from '@/devlink';

interface UserPayload {
    user_metadata?: {
        podio_type?: string;
    };
    [key: string]: any;
}

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const user = token ? (await verifyToken(token)) as UserPayload : null;
    const session = user ? { user } : null;

    // Link Identity if needed
    const loginType = cookieStore.get('app_login_type')?.value || 'portal';
    if (session) {
        try {
            // Identity linking expects a session object
            // This ensures Podio and Auth0 users are synced
            await linkUserIdentity(session, loginType as 'portal' | 'student');
        } catch (error) {
            console.error("Failed to link identity:", error);
        }
    }

    // Logic to determine User Type from session or metadata
    // Currently defaulting to 'default' if not found
    const userType = session?.user?.user_metadata?.podio_type || 'default';

    console.log(`[Dashboard] User Type: ${userType}`);

    // Conditional Rendering Logic
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
                        <Sidebar className="h-full" />
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
