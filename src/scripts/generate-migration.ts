
import fs from 'fs/promises';
import path from 'path';

const INPUT_FILE = path.join(process.cwd(), 'podio_full_schema.json');

const TYPE_MAPPING: Record<string, string> = {
    text: 'text',
    email: 'text',
    phone: 'text',
    location: 'text',
    url: 'text',
    duration: 'text',
    category: 'text',
    date: 'timestamptz',
    number: 'numeric',
    progress: 'numeric',
    money: 'numeric',
    calculation: 'text',
    app: 'jsonb',
    image: 'jsonb',
    embed: 'jsonb',
    contact: 'jsonb'
};

function sanitize(name: string) {
    // Trim is crucial as Podio names often have trailing spaces
    return name.trim().replace(/[^a-z0-9_]/g, '_').toLowerCase();
}

async function main() {
    const content = await fs.readFile(INPUT_FILE, 'utf-8');
    const apps = JSON.parse(content);

    let sql = '-- Auto-generated migration from Podio Schema\n\n';

    for (const app of apps) {
        const tableName = sanitize(app.app_name);

        sql += `-- Table: ${tableName} (Podio App ID: ${app.app_id})\n`;
        sql += `CREATE TABLE IF NOT EXISTS ${tableName} (\n`;
        // podio-sync.ts expects podio_item_id as the primary key for upserts
        sql += `  podio_item_id BIGINT PRIMARY KEY,\n`;
        sql += `  id BIGINT, -- Internal sequential DB id if needed, but podio_item_id is better unique ref\n`;
        sql += `  podio_app_item_id INT, -- User-facing 'App Item ID'\n`;
        sql += `  podio_formatted_id TEXT, -- Formatted App Item ID (e.g. S0001)\n`;
        sql += `  created_at TIMESTAMPTZ,\n`;
        sql += `  updated_at TIMESTAMPTZ,\n`; // Podio's 'last_event_on' usually maps here
        sql += `  last_updated_at TIMESTAMPTZ DEFAULT now() -- Internal sync timestamp\n`;
        sql += `);\n\n`;

        // Now generate ALTER statements to ensure columns exist
        // Explicitly check for metadata columns that might be missing on existing tables
        const metadataCols = [
            { name: 'podio_item_id', type: 'BIGINT' },
            { name: 'podio_app_item_id', type: 'INT' },
            { name: 'podio_formatted_id', type: 'TEXT' },
            { name: 'created_at', type: 'TIMESTAMPTZ' },
            { name: 'updated_at', type: 'TIMESTAMPTZ' },
            { name: 'last_updated_at', type: 'TIMESTAMPTZ' }
        ];

        for (const col of metadataCols) {
            sql += `DO $$\nBEGIN\n`;
            sql += `  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '${tableName}' AND column_name = '${col.name}') THEN\n`;
            sql += `    ALTER TABLE ${tableName} ADD COLUMN "${col.name}" ${col.type};\n`;
            sql += `  END IF;\nEND$$;\n`;
        }

        const fields = app.full_def ? app.full_def.fields : app.fields; // Adapt to structure

        for (const field of fields || []) {
            if (field.status === 'deleted') continue;
            if (!field.external_id) continue;

            const columnName = sanitize(field.external_id);
            // Skip reserved columns we handle manually above
            if (['id', 'podio_item_id', 'created_at', 'updated_at', 'last_updated_at'].includes(columnName)) continue;

            const pgType = TYPE_MAPPING[field.type] || 'text';

            sql += `DO $$\nBEGIN\n`;
            sql += `  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '${tableName}' AND column_name = '${columnName}') THEN\n`;
            sql += `    ALTER TABLE ${tableName} ADD COLUMN "${columnName}" ${pgType};\n`;
            sql += `  END IF;\n`;
            sql += `END$$;\n`;
        }
        sql += '\n';
    }

    const OUTPUT_FILE = path.join(process.cwd(), 'supabase/migrations/pending_migration.sql');
    await fs.writeFile(OUTPUT_FILE, sql);
    console.log(`Migration generated at ${OUTPUT_FILE}`);
}

main().catch(console.error);
