import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const registry=JSON.parse(readFileSync(new URL('../registry.json',import.meta.url)));
test('registry contains exactly eight free items with complete local source',()=>{assert.equal(registry.items.length,8);assert.equal(new Set(registry.items.map(i=>i.name)).size,8);for(const item of registry.items){assert.equal(item.meta.access,'free');for(const file of item.files){assert.equal(file.content,readFileSync(new URL('../'+file.path,import.meta.url),'utf8'));assert.ok(!/waitlist|supabase|sb_publishable_|sb_secret_|RESEND_API_KEY|pixsel-original|motion\/optimized|https?:.*[?&](token|key)=/i.test(file.content));}}});
test('repository remains unpublished until licensing is approved',()=>{const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url)));assert.equal(pkg.private,true);assert.equal(pkg.license,'UNLICENSED');});
