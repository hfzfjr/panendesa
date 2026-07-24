import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST before any other imports
// Try multiple paths to ensure .env is found regardless of where the script is run from
const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '../.env'),
    path.resolve(__dirname, '../../.env'),
];

let loaded = false;
for (const envPath of envPaths) {
    try {
        const result = dotenv.config({ path: envPath });
        if (result.error) {
            // File doesn't exist, try next path
            continue;
        }
        if (Object.keys(result.parsed || {}).length > 0) {
            console.log(`Loaded .env from: ${envPath}`);
            loaded = true;
            break;
        }
    } catch (e) {
        // Try next path
        continue;
    }
}

if (!loaded) {
    console.warn('Warning: .env file not found in any expected location');
}

export { };
