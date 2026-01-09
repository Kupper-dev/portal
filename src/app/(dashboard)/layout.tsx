import type { Metadata } from 'next';
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { PortalSidebar } from "@/components/PortalSidebar";
import { ItemDetails } from "@/devlink/ItemDetails";
import { ExtendedDetails } from "@/devlink/ExtendedDetails";
// import { Sidebar } from "@/devlink"; // Removed as DashboardSection includes it
// Importing global CSS to ensure DevLink styles are applied
import '@/devlink/global.css';

export const metadata: Metadata = {
    title: 'Kupper Portal',
    description: 'Manage your services',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DevLinkProvider>
            <div className="main-wrapper">
                <PortalSidebar />
                <div className="sidepanel is-expanded">
                    <div className="sidepanel-header"></div>
                    <div className="sidepanel-content">
                        <div className="panel-layer-base">
                            <ItemDetails />
                        </div>
                        <div className="panel-layer-extended">
                            <ExtendedDetails />
                        </div>
                    </div>
                </div>
                <div className="sidepanel-overlay"></div>
                <div className="module">
                    {children}
                </div>
            </div>
        </DevLinkProvider>
    );
}
