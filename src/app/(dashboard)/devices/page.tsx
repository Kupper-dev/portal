

import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUserDevicesData } from '@/lib/data-service';
import { PageHero, TableDevices } from '@/devlink';
import { DeviceItem } from '@/lib/service-types';
import Link from 'next/link';

export default async function DevicesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    let session = token ? await decryptSession(token) : null;



    if (!session) {
        redirect('/auth/login');
    }

    const devices = await getUserDevicesData();

    // Helper for days remaining
    const getDaysRemaining = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        const target = new Date(dateStr);
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    // Helper for maintenance status/variant
    const getMaintenanceStatus = (nextDateStr?: string) => {
        if (!nextDateStr) return { percent: 0, variant: 'no-maintenance' as const };
        const nextDate = new Date(nextDateStr);
        const today = new Date();
        // Assume 1 year cycle
        const oneYearMs = 365 * 24 * 60 * 60 * 1000;
        const startDate = new Date(nextDate.getTime() - oneYearMs);
        const totalDuration = nextDate.getTime() - startDate.getTime();
        const elapsed = today.getTime() - startDate.getTime();
        let percent = (elapsed / totalDuration) * 100;
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        let variant: "Positive" | "Base" | "Negative" | "Warning" = "Positive";
        if (percent <= 92) variant = "Positive";
        else if (percent <= 97) variant = "Warning";
        else variant = "Negative";

        return { percent, variant };
    };

    // Helper for icon
    const getDeviceIcon = (type: string = '') => {
        const typeLower = type.toLowerCase();
        const iconMap: Record<string, string> = {
            'laptop': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4e5b39ae5f0433564e_Laptop%20Icon.png',
            'aio': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4e650d70452456c089_AIO%20icon.png',
            'pc': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4f7c0ed258d3196a8f_PC%20Icon.png',
            'otro': 'https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/695bfd4f7efd6d0463ee5d37_Other%20icon.png'
        };
        return iconMap[typeLower] || iconMap['laptop'];
    };

    return (
        <>
            <PageHero
                heroTitle="Dispositivos"
                imageHero1="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/67843644ec2796dc2e9c2f6d_Laptop%20icon.svg"
                imageHero2="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/678436441ef58474771acb98_PC%20Icon.svg"
            />
            <div className="page-table">
                <div className="list">
                    {devices.length > 0 ? (
                        devices.map((item: DeviceItem, index: number) => {
                            const maintenance = getMaintenanceStatus(item.nextmaintenance);
                            return (

                                <Link
                                    key={index}
                                    href={`/app/devices/${item.podio_item_id}`}
                                    className="block-link"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <TableDevices
                                        variant={maintenance.variant as any}
                                        devicesBrandAndModel={item.brandmodel || 'N/A'}
                                        devicesDepartmentOrContact={item.departmentorcontact || '-'}
                                        devicesItemIdFormatted={item.podio_formatted_id || `#${item.podio_item_id}`}
                                        devicesTypeIcon={getDeviceIcon(item.type)}
                                        devicesStatusText={item.status || 'N/A'}
                                        devicesNextMaintenanceText={item.nextmaintenance ? new Date(item.nextmaintenance).toLocaleDateString('es-MX') : 'N/A'}
                                        remainingDaysToNextMaintenance={`${getDaysRemaining(item.nextmaintenance)} días`}
                                        devicesRemainingDaysToNextMaintenanceVisibility={!!item.nextmaintenance}
                                        devicesProgressBar={{
                                            style: { width: `${maintenance.percent}%` }
                                        }}
                                    />
                                </Link>
                            );
                        })
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--_dev---text-gray)' }}>
                            No Devices Found
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


