'use client';

import { useEffect } from 'react';

export default function RegisterError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('REGISTER PAGE ERROR:', error);
    }, [error]);

    return (
        <div className="p-8 text-red-600 bg-white min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Registration Error</h2>
            <div className="mb-4 text-center max-w-lg overflow-auto bg-gray-100 p-4 rounded border border-red-200">
                <p className="font-mono text-sm break-all">{error.message || "Unknown error"}</p>
                {error.digest && <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>}
            </div>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}
