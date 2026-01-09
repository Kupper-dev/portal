
import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserServiceData } from '@/lib/data-service';
import { PageHero } from '@/devlink/PageHero';
import { ServicesTable } from '@/devlink/ServicesTable';

export default async function ServicesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    let session = token ? await decryptSession(token) : null;



    if (!session) {
        redirect('/auth/login');
    }

    const serviceItems = await getUserServiceData();

    return (
        <>
            <PageHero
                heroTitle="Servicios"
                imageHero1="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/67843644ec2796dc2e9c2f6d_Laptop%20icon.svg"
                imageHero2="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/678436441ef58474771acb98_PC%20Icon.svg"
            />
            <div className="page-table">
                <div className="list">
                    {serviceItems && serviceItems.length > 0 ? (
                        serviceItems.map((item) => (
                            <ServicesTable
                                key={item.service.podio_item_id}
                                servicesTitle={item.service.requestorissue || "Service"}
                                servicesDeviceBrandAndModel={item.device?.brandmodel || "Unknown Device"}
                                servicesItemIdFormatted={item.service.podio_formatted_id}
                                servicesDate={new Date(item.service.date).toLocaleDateString()}
                                servicesStatusText={item.service.status}
                            />
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--_dev---text-gray)' }}>
                            No active services found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
