import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PageHero, ServicesTable } from '@/devlink';
import { getUserServiceData } from '@/lib/data-service';

export default async function DashboardPage() {
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
        } as any;
    }

    if (!session) {
        redirect('/auth/login');
    }

    const userName = (session.name || session.email.split('@')[0]).split(' ')[0];

    // Fetch service data
    const serviceItems = await getUserServiceData();

    return (
        <>
            <PageHero heroTitle="Dashboard" />
            <div className="page-table">
                <div className="list">
                    {serviceItems?.map((item) => (
                        <ServicesTable
                            key={item.service.podio_item_id}
                            servicesTitle={item.service.requestorissue || "Service"}
                            servicesDeviceBrandAndModel={item.device?.brandmodel || "Unknown Device"}
                            servicesItemIdFormatted={item.service.podio_formatted_id}
                            servicesDate={new Date(item.service.date).toLocaleDateString()}
                            servicesStatusText={item.service.status}
                        />
                    ))}
                    {!serviceItems?.length && (
                        <div className="p-4 text-center text-gray-500">No active services found.</div>
                    )}
                </div>
            </div>
        </>
    );
}
