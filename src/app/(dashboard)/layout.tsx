import type { Metadata } from 'next';
import { DevLinkProvider } from "@/devlink";
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
            <main>
                {children}
            </main>
        </DevLinkProvider>
    );
}
