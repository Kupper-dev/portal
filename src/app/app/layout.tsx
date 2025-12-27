import type { Metadata } from 'next';
import { DevLinkProvider } from "@/devlink";
import { Sidebar } from "@/devlink";
// Importing global CSS to ensure DevLink styles are applied
import '@/devlink/global.css'; 

export const metadata: Metadata = {
  title: 'Kupper Portal',
  description: 'Manage your services',
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DevLinkProvider>
      <div className="flex min-h-screen">
          {/* Sidebar - Assuming it takes full height */}
          <div className="flex-shrink-0">
             <Sidebar />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1">
            {children}
          </main>
      </div>
    </DevLinkProvider>
  );
}
