
import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserWarrantiesData } from '@/lib/data-service';
import { PageHero } from '@/devlink/PageHero';
import { WarrantiesTable } from '@/devlink/WarrantiesTable';
import { WarrantyItem } from '@/lib/service-types';

export default async function WarrantiesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    let session = token ? await decryptSession(token) : null;



    if (!session) {
        redirect('/auth/login');
    }

    const warranties = await getUserWarrantiesData();

    // Helper to calculate Validity
    const getValidityDetails = (dateEnds: string | undefined) => {
        if (!dateEnds) return { text: '0 días', isActive: false };
        const now = new Date();
        const end = new Date(dateEnds);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isActive = end > now;
        return { text: `${diffDays} días`, isActive };
    };

    return (
        <>
            <PageHero
                heroTitle="Garantías"
                imageHero1="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/67843644ec2796dc2e9c2f6d_Laptop%20icon.svg"
                imageHero2="https://cdn.prod.website-files.com/68d88947f902d5546e5fd07a/678436441ef58474771acb98_PC%20Icon.svg"
            />
            <div className="page-table">
                <div className="list">
                    {warranties && warranties.length > 0 ? (
                        warranties.map((item: WarrantyItem, index: number) => {
                            const { text, isActive } = getValidityDetails(item.dateends);
                            return (
                                <WarrantiesTable
                                    key={index}
                                    variant={isActive ? "Positive" : "Negative"}
                                    warrantiesItemTitle={item.description || "Garantía"}
                                    warrantiesDetails={item.observations || "Sin observaciones"}
                                    warrantiesQuantity={item.quantity ? String(item.quantity) : "0"}
                                    warrantiesWarrantyPeriod={item.warranty || "N/A"}
                                    warrantiesStatusText={isActive ? "Activa" : "Inactiva"}
                                    warrantiesWarrantyValidity={text}
                                />
                            );
                        })
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--_dev---text-gray)' }}>
                            No warranties found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

