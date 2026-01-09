
import React from 'react';
import { Sidebar } from '@/devlink';
import { decryptSession } from '@/lib/auth-edge';
import { cookies } from 'next/headers';

export async function PortalSidebar() {
    const cookieStore = await cookies();
    const token = cookieStore.get('app_session')?.value;
    let session = token ? await decryptSession(token) : null;



    const userName = session?.name || "User";
    // Parse picture or use default
    const userPicture = session?.picture || "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    // Determine account type or use default
    // Determine account type or use default
    const accountType = session?.userType || "Cliente";

    return (
        <Sidebar
            sidebarUserName={userName}
            sidebarUserProfilePicture={userPicture}
            sidebarUserAccountType={accountType}

            // Navigation Links
            sidebarDashboard={{ href: "/app" }}
            sidebarDevices={{ href: "/app/devices" }}
            sidebarServices={{ href: "/app/services" }}
            sidebarWarranties={{ href: "/app/warranties" }}
            sidebarQuotations={{ href: "/app/quotations" }}
            sidebarInvoices={{ href: "/app/invoices" }}
            sidebarApprovals={{ href: "/app/approvals" }}

            sidebarUserLogout={{ href: "/app/auth/logout" }}
            sidebarUserProfile="Ver perfil"
        />
    );
}
