const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../../node_modules/unenv/dist/runtime/polyfill/timers.mjs');

if (!fs.existsSync(targetFile)) {
    console.log('Skipping patch: unenv timers polyfill not found.');
    process.exit(0);
}

const content = fs.readFileSync(targetFile, 'utf8');

// The line we want to wrap
const search = 'globalThis.setImmediate = setImmediate;';
const replace = 'try { globalThis.setImmediate = setImmediate; } catch (e) {}';

if (content.includes(replace)) {
    console.log('unenv timers polyfill already patched.');
} else if (content.includes(search)) {
    const newContent = content.replace(search, replace);
    fs.writeFileSync(targetFile, newContent);
    console.log('Successfully patched unenv timers polyfill.');
} else {
    console.log('Could not find pattern to patch in unenv timers polyfill.');
}
