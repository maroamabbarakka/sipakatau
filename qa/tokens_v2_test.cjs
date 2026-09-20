const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/tokens-v2.css', 'utf8');

assert.match(html, /css\/tokens-v2\.css/);
assert.match(css, /--v2-body-size:\s*16px/);
assert.match(css, /--v2-label-size:\s*16px/);
assert.match(css, /--v2-helper-size:\s*14px/);
assert.match(css, /--v2-control-min:\s*48px/);
assert.match(css, /prefers-reduced-motion|overflow-x:\s*(hidden|clip)/);
assert.match(css, /@media\s*\(max-width:\s*360px\)/);

console.log('TOKENS V2 TEST PASS: stylesheet load, type/control tokens, and narrow viewport guardrails.');
