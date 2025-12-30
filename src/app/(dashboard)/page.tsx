import { decryptSession, AppSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { Sidebar, Hero, ServicesDetailsAndStatus, Header } from '@/devlink';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    const session = token ? await decryptSession(token) : null;

    if (!session) {
        redirect('/auth/login');
    }

    const userName = (session.name || session.email.split('@')[0]).split(' ')[0];
    console.log('[Dashboard] User Name:', userName, 'Full Name:', session.name, 'Email:', session.email);

    // Placeholder image since session doesn't store it to save space
    const userImage = "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    return (
        <div className="dashboard_section">
            <Sidebar />
            <Header
                userProfilePicture={{ src: userImage }}
                userProfileLink={{ href: '/profile' }}
                userLogOut={{ href: '/app/auth/logout' }}
            />
            <Hero
                heroRecipientNameOnly={{ children: userName }}
                heroRecipientName={userName}
            />
            <ServicesDetailsAndStatus
                devicesDeviceBrandModel="MacBook Pro 16 M1 Max"
                devicesSerial="C02123456789"
                servicesRequestOrIssue="Battery Replacement"
                servicesDataBackup="No Backup Requested"
                servicesPowerAdapter="Included"
                servicesObservations="Minor scratches on bottom case"
                servicesDate={{ value: "Oct 24, 2023" }}
                servicesDiagnosis={{ href: "#" }}
                servicesDiagnosisAcceptance={{ href: "#" }}
                servicesPrice="$150.00"

                // Status dates - passing simplified strings as children for now since they are ReactNodes
                servicesDateServicesStatusDispositivoRecibido="Oct 24, 10:00 AM"
                servicesDateServicesStatusDispositivoEnRevision=""
                servicesDateServiceStatusEnviarDiagnostico=""
                servicesDateServicesStatusRefaccionesEnCamino=""
                servicesDateServicesStatusIniciaReparacion=""
                servicesDateServicesStatusEnviarCodigoDeSeguridad=""
                servicesDateServicesStatusDispositivoEntregado=""

                servicesAccessories="None"

                // Status hours
                servicesHourServicesStatusDispositivoRecibido="10:00 AM"
                servicesHourServicesStatusDispositivoEnRevision=""
                servicesHourServicesStatusIniciaReparacion=""
                servicesHourServicesStatusEnviarCodigoDeSeguridad=""
                servicesHourServicesStatusDispositivoEntregado=""
                servicesHourServicesStatusEnviarDiagnostico=""
                servicesHourServicesStatusRefaccionesEnCamino=""
            />
        </div>
    );
}
