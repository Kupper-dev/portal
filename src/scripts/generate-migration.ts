
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
        sql += `  id BIGINT PRIMARY KEY, -- Podio Item ID\n`;
        sql += `  podio_app_item_id INT, -- Ref to app_item_id usually\n`;
        sql += `  created_at TIMESTAMPTZ DEFAULT now(),\n`;
        sql += `  last_event_on TIMESTAMPTZ,\n`;
        sql += `  updated_at TIMESTAMPTZ DEFAULT now()\n`;
        sql += `);\n\n`;

        // Now generate ALTER statements to ensure columns exist
        const fields = app.full_def.fields;

        for (const field of fields) {
            if (field.status === 'deleted') continue;
            if (!field.external_id) continue;

            const columnName = sanitize(field.external_id);
            if (columnName === 'id') continue;

            const pgType = TYPE_MAPPING[field.type] || 'text';

            sql += `DO $$\nBEGIN\n`;
            sql += `  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '${tableName}' AND column_name = '${columnName}') THEN\n`;
            sql += `    ALTER TABLE ${tableName} ADD COLUMN "${columnName}" ${pgType};\n`;
            sql += `  END IF;\n`;
            sql += `END$$;\n`;
        }
        sql += '\n';
    }

    console.log(sql);
}

main().catch(console.error);
