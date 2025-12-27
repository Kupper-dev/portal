'use client';

import { useEffect } from 'react';

export default function ClientRedirect({ destination }: { destination: string }) {
    useEffect(() => {
        // Hard navigation to ensure clean state
        window.location.href = destination;
    }, [destination]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Redirigiendo...</p>
            </div>
        </div>
    );
}
