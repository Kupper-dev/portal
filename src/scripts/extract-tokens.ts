import * as fs from 'fs';
import * as path from 'path';

const APPS_FILE = path.resolve(process.cwd(), 'podio_apps_complete.json');
const OUTPUT_FILE = path.resolve(process.cwd(), 'src/lib/generated-podio-config.ts');
const ENV_SNIPPET_FILE = path.resolve(process.cwd(), 'podio_tokens.env');

// Known tokens (can be hardcoded if we are sure, but safer to use env vars)
const KNOWN_TOKENS: Record<number, string> = {
    30429788: '3398c5417835467389a1c43026330088', // Customers
    30432041: '42700344c4b64835a6437d8065091a61', // Students
};

async function main() {
    console.log('Generating dynamic Podio configuration...');
    if (!fs.existsSync(APPS_FILE)) {
        console.error('Apps file not found:', APPS_FILE);
        return;
    }

    const apps = JSON.parse(fs.readFileSync(APPS_FILE, 'utf8'));

    let configContent = `export interface PodioAppConfig {
  appId: number;
  token: string;
  name: string;
  urlLabel: string;
}

export const PODIO_APPS: PodioAppConfig[] = [\n`;

    let envSnippet = `# Add these to your .env file\n`;

    for (const app of apps) {
        // Sanitize name for env var (e.g. 'customers ' -> 'CUSTOMERS')
        const safeName = app.name.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_');
        const envVarName = `PODIO_TOKEN_${safeName}`;

        // ALWAYS use env var in code for consistency
        const tokenValue = `process.env.${envVarName} || ""`;

        configContent += `  {
    appId: ${app.id},
    token: ${tokenValue},
    name: "${app.name.trim()}",
    urlLabel: "${app.url_label}"
  },\n`;

        const knownToken = KNOWN_TOKENS[app.id];
        if (knownToken) {
            envSnippet += `${envVarName}=${knownToken}\n`;
        } else {
            envSnippet += `${envVarName}= # Get from: https://podio.com/kupper/panel/apps/${app.url_label}/developer\n`;
        }
    }

    configContent += `];\n\n`;
    configContent += `export function getAppConfig(appId: number): PodioAppConfig | undefined {
  return PODIO_APPS.find(a => a.appId === appId);
}\n`;

    fs.writeFileSync(OUTPUT_FILE, configContent);
    fs.writeFileSync(ENV_SNIPPET_FILE, envSnippet);

    console.log(`Generated ${OUTPUT_FILE}`);
    console.log(`Generated ${ENV_SNIPPET_FILE}`);
    console.log('Please check podio_tokens.env for required tokens!');
}

main();
