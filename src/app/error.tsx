'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('GLOBAL APPLICATION ERROR:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="p-8 text-red-600 bg-white min-h-screen flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                    <div className="mb-4 text-center max-w-2xl overflow-auto bg-gray-100 p-4 rounded border border-red-200">
                        <p className="font-mono text-sm break-all">{error.message || "Unknown error"}</p>
                        {error.digest && <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>}
                        <pre className="mt-4 text-xs text-left overflow-auto whitespace-pre-wrap">
                            {error.stack}
                        </pre>
                    </div>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
