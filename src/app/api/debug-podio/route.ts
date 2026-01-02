import { NextRequest, NextResponse } from 'next/server';
import { fetchPodioItem, processServicesAutoTimestamping, getPodioAppClient } from '@/lib/podio-sync';


// export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const itemIdStr = searchParams.get('itemId');

    if (!itemIdStr) {
        return NextResponse.json({ error: 'Missing itemId parameter' }, { status: 400 });
    }

    const itemId = parseInt(itemIdStr, 10);
    if (isNaN(itemId)) {
        return NextResponse.json({ error: 'Invalid itemId' }, { status: 400 });
    }

    console.log(`[Debug] Starting debug for Item ID: ${itemId}`);
    console.log('[Debug] PODIO_TOKEN_SERVICES present:', !!process.env.PODIO_TOKEN_SERVICES);
    console.log('[Debug] PODIO_CLIENT_ID present:', !!process.env.PODIO_CLIENT_ID);


    try {
        // 1. Fetch the item
        const result = await fetchPodioItem(itemId);

        if (!result) {
            return NextResponse.json({ error: 'Item not found in any configured Podio App' }, { status: 404 });
        }

        const { appConfig, data } = result;

        // 2. Extract relevant fields for inspection
        const statusField = data.fields.find((f: any) => f.external_id === 'status');
        const statusText = statusField?.values?.[0]?.value?.text;

        const debugInfo = {
            app: {
                name: appConfig.name,
                urlLabel: appConfig.urlLabel,
                appId: appConfig.appId,
            },
            item: {
                item_id: data.item_id,
                title: data.app_item_id_formatted || data.item_id,
                created_on: data.created_on,
            },
            status: {
                found: !!statusField,
                value: statusText
            },
            fields: data.fields.map((f: any) => ({
                external_id: f.external_id,
                label: f.label,
                type: f.type,
                values: f.values
            }))
        };

        // 3. Test Auto-Timestamp Logic
        let timestampResult: any = { skipped: true, reason: 'Not services app' };

        if (appConfig.name === 'services') {
            timestampResult = await processServicesAutoTimestamping(appConfig, data);
        }

        // Fetch App Definition to check available fields
        const podio = await getPodioAppClient(appConfig.appId);
        const appDef = await podio.request('GET', `/app/${appConfig.appId}`);
        const appFields = appDef.fields.map((f: any) => ({
            external_id: f.external_id,
            type: f.type,
            label: f.config.label,
            config: f.config
        }));

        return NextResponse.json({
            success: true,
            debugInfo,
            appFields,
            timestampLogic: timestampResult
        });

    } catch (error: any) {
        console.error('[Debug] Error:', error);
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
