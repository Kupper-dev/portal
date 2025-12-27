import { verifyToken } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { DashboardSection } from '@/devlink';
import { ServicesDetailsAndStatus } from '@/devlink'; // Example as another type

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
            // Perhaps for standard users we show a specific view?
            return (
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Standard Dashboard</h1>
                    <DashboardSection />
                </div>
            );
        default:
            // Default / Fallback Dashboard
            return (
                <div className="p-8">
                    <DashboardSection />
                </div>
            );
    }
}
