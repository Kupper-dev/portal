import { verifyToken } from '@/lib/auth-edge';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { linkUserIdentity } from "@/lib/identity-linker";
import { getSupabaseAdmin } from '@/lib/supabase';
import {
    ServicesDetailsAndStatus,
    Sidebar,
    Header,
    Hero
} from '@/devlink';

interface UserPayload {
    name?: string;
    picture?: string;
    sub?: string;
    user_metadata?: {
        podio_type?: string;
    };
    [key: string]: any;
}

async function getLatestServiceForUser(auth0Id: string, email: string) {
    const supabase = getSupabaseAdmin();

    // 1. Get Customer by Auth0 ID (or email fallback)
    let { data: customer } = await supabase
        .from('customers')
        .select('*')
        .eq('auth0id', auth0Id)
        .maybeSingle();

    if (!customer) {
        const { data: customerByEmail } = await supabase
            .from('customers')
            .select('*')
            .eq('email', email)
            .maybeSingle();
        customer = customerByEmail;
    }

    if (!customer?.podio_item_id) {
        return null;
    }

    // 2. Get Services linked to this Customer
    // Assuming 'customer' column in services table contains the Customer Podio Item ID
    // We fetch the most recent one
    const { data: services } = await supabase
        .from('services')
        .select('*')
        .contains('customer', [customer.podio_item_id]) // JSONB array check
        .order('created_at', { ascending: false }) // or created_on
        .limit(1);

    return services?.[0] || null;
}

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const user = token ? (await verifyToken(token)) as UserPayload : null;
    const session = user ? { user } : null;



    // Link Identity if needed (Client side usually triggers this or specific flow, but keeping here as per previous code)
    const loginType = cookieStore.get('app_login_type')?.value || 'portal';
    if (session) {
        try {
            const linkage = await linkUserIdentity(session, loginType as 'portal' | 'student');
            if (linkage.status === 'incomplete') {
                redirect('/auth/register');
            }
        } catch (error) {
            console.error("Failed to link identity:", error);
            // If it's a redirect error, rethrow it so Next.js handles it
            if ((error as any)?.digest?.includes('NEXT_REDIRECT')) {
                throw error;
            }
        }
    }

    const userType = session?.user?.user_metadata?.podio_type || 'default';
    const userName = session?.user?.name || "User";
    const userPicture = session?.user?.picture;
    const auth0Id = session?.user?.sub;
    const userEmail = session?.user?.email;

    // Fetch Service Data for Standard Users
    let serviceItem = null;
    if (auth0Id && userEmail) {
        // We try to fetch service regardless of type to populate the view if available
        try {
            serviceItem = await getLatestServiceForUser(auth0Id, userEmail);
        } catch (err) {
            console.error("Failed to fetch service item:", err);
        }
    }

    // Date formatting helper
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex h-screen w-full bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:block h-full">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header
                    userProfilePicture={{ src: userPicture }}
                    userLogOut={{ options: { href: "/app/auth/logout" } }}
                // wrapper or style overrides if needed
                />

                <main className="flex-1 overflow-y-auto w-full">
                    {/* Webflow specific wrapper class */}
                    <div className="dashboard_section">
                        <div className="max-w-7xl mx-auto w-full">
                            <Hero
                                heroRecipientName={userName}
                            />

                            {/* Debugging Info */}
                            <div className="hidden">
                                Debug: Auth0 ID: {auth0Id}, Email: {userEmail}, Service Found: {serviceItem ? 'Yes' : 'No'}
                            </div>

                            {/* Render ServicesDetailsAndStatus if we have a service item */}
                            {serviceItem ? (
                                <div className="mt-8">
                                    <ServicesDetailsAndStatus
                                        servicesDate={formatDate(serviceItem.created_on || serviceItem.created_at)}
                                        servicesServicePodioItemIdFormatted={serviceItem.podio_formatted_id}
                                        servicesDiagnosis={serviceItem.diagnosis}
                                        servicesPrice={serviceItem.price}
                                        servicesRequestOrIssue={serviceItem.title || serviceItem.request_or_issue}
                                        servicesObservations={serviceItem.observations}

                                        servicesHourServicesStatusDispositivoRecibido={serviceItem.hour_dispositivo_recibido}
                                        servicesHourServicesStatusDispositivoEnRevision={serviceItem.hour_dispositivo_en_revision}
                                        servicesHourServicesStatusIniciaReparacion={serviceItem.hour_inicia_reparacion}
                                        servicesHourServicesStatusEnviarCodigoDeSeguridad={serviceItem.hour_enviar_codigo_de_seguridad}
                                        servicesHourServicesStatusDispositivoEntregado={serviceItem.hour_dispositivo_entregado}
                                        servicesHourServicesStatusEnviarDiagnostico={serviceItem.hour_enviar_diagnostico}
                                        servicesHourServicesStatusRefaccionesEnCamino={serviceItem.hour_refacciones_en_camino}
                                    />
                                </div>
                            ) : (
                                <div className="mt-8 p-4 text-center text-gray-500 bg-white rounded shadow">
                                    <p>No registered services found for this user.</p>
                                    <p className="text-xs mt-2">ID: {auth0Id}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
