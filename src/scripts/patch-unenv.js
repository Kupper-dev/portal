const fs = require('fs');
const path = require('path');

function findFile(startDir, fileName) {
    if (!fs.existsSync(startDir)) return null;
    const files = fs.readdirSync(startDir);
    for (const file of files) {
        const fullPath = path.join(startDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === 'node_modules') {
                // Recursive check in nested node_modules
                const result = findFile(fullPath, fileName);
                if (result) return result;
            } else {
                // Standard recursive search? NO, too slow.
                // Only check unenv dirs.
            }
        }
    }
    // This is too generic. Let's precise check.
    return null;
}

const possiblePaths = [
    path.join(__dirname, '../../node_modules/unenv/dist/runtime/polyfill/timers.mjs'),
    path.join(__dirname, '../../node_modules/@opennextjs/cloudflare/node_modules/unenv/dist/runtime/polyfill/timers.mjs')
];

let patchedCount = 0;

possiblePaths.forEach(targetFile => {
    if (fs.existsSync(targetFile)) {
        console.log(`Patching found at: ${targetFile}`);
        const content = fs.readFileSync(targetFile, 'utf8');

        // The line we want to wrap
        const search = 'globalThis.setImmediate = setImmediate;';
        const replace = 'try { globalThis.setImmediate = setImmediate; } catch (e) {}';

        if (content.includes(replace)) {
            console.log('unenv timers polyfill already patched.');
            patchedCount++;
        } else if (content.includes(search)) {
            const newContent = content.replace(search, replace);
            fs.writeFileSync(targetFile, newContent);
            console.log('Successfully patched unenv timers polyfill.');
            patchedCount++;
        } else {
            console.log('Could not find pattern to patch in unenv timers polyfill.');
        }
    }
});

if (patchedCount === 0) {
    console.warn("WARNING: No unenv timers.mjs file found to patch! This likely means unenv is installed in a non-standard location or not present.");
    // Try to find it via find? No, simpler to just warn.
    // Maybe listing node_modules might help debug if we could see logs.
}
