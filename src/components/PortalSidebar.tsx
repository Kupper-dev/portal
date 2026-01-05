import React from 'react';
import { Sidebar } from '@/devlink';

export function PortalSidebar() {
    return (
        <Sidebar
            sIdebarServices={{ href: "/app/services" }}
            dashboard={{ href: "/app" }}
            warranties={{ href: "/app/warranties" }}
            devices={{ href: "/app/devices" }}
            invoices={{ href: "/app/invoices" }}
            approvals={{ href: "/app/approvals" }}
        />
    );
}
