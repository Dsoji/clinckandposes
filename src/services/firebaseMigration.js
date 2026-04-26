import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { supabase, SUPABASE_BUCKET } from '../supabase';

const SECTIONS = [
    { id: 'hero', wrap: 'content' },
    { id: 'reviews', wrap: 'content' },
    { id: 'settings', wrap: 'content' },
    { id: 'portfolio', wrap: null },
];

const isFirebaseStorageUrl = (value) =>
    typeof value === 'string' &&
    (value.includes('firebasestorage.googleapis.com') ||
     value.includes('firebasestorage.app'));

const fileNameFromUrl = (url) => {
    try {
        const u = new URL(url);
        const last = decodeURIComponent(u.pathname.split('/').pop() || 'image');
        const base = last.split('/').pop().split('?')[0];
        return base.replace(/[^a-zA-Z0-9._-]/g, '_') || `image_${Date.now()}`;
    } catch {
        return `image_${Date.now()}`;
    }
};

const reuploadToSupabase = async (url, pathPrefix, log) => {
    log(`  ↳ fetching ${url.slice(0, 80)}…`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
    const blob = await res.blob();
    const name = fileNameFromUrl(url);
    const objectPath = `${pathPrefix}/${Date.now()}_${name}`;

    const { error: upErr } = await supabase
        .storage
        .from(SUPABASE_BUCKET)
        .upload(objectPath, blob, {
            cacheControl: '3600',
            upsert: false,
            contentType: blob.type || 'image/jpeg',
        });

    if (upErr) throw upErr;

    const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
    log(`  ↳ uploaded → ${data.publicUrl.slice(0, 80)}…`);
    return data.publicUrl;
};

const remapImageUrls = async (node, pathPrefix, log) => {
    if (Array.isArray(node)) {
        const out = [];
        for (const item of node) out.push(await remapImageUrls(item, pathPrefix, log));
        return out;
    }
    if (node && typeof node === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(node)) {
            out[k] = await remapImageUrls(v, pathPrefix, log);
        }
        return out;
    }
    if (isFirebaseStorageUrl(node)) {
        try {
            return await reuploadToSupabase(node, pathPrefix, log);
        } catch (e) {
            log(`  ⚠ failed to migrate image: ${e.message} — keeping original URL`);
            return node;
        }
    }
    return node;
};

export const migrateFirebaseToSupabase = async (log = console.log) => {
    const summary = { migrated: [], skipped: [], errors: [] };

    for (const { id, wrap } of SECTIONS) {
        log(`\n— Section: ${id}`);
        try {
            const ref = doc(db, `site/${id}`);
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                log(`  ↳ no Firestore doc, skipping`);
                summary.skipped.push(id);
                continue;
            }

            const raw = snap.data();
            const inner = wrap ? raw[wrap] : raw;
            if (!inner) {
                log(`  ↳ doc exists but is empty, skipping`);
                summary.skipped.push(id);
                continue;
            }

            log(`  ↳ remapping image URLs…`);
            const remapped = await remapImageUrls(inner, `migrated/${id}`, log);

            log(`  ↳ writing to Supabase site_content.${id}…`);
            const { error: writeErr } = await supabase
                .from('site_content')
                .upsert({ id, content: remapped }, { onConflict: 'id' });

            if (writeErr) throw writeErr;

            log(`  ✓ done: ${id}`);
            summary.migrated.push(id);
        } catch (err) {
            log(`  ✗ failed: ${err.message || err}`);
            summary.errors.push({ id, message: err.message || String(err) });
        }
    }

    log(`\n— Migration finished. Migrated: ${summary.migrated.length}, Skipped: ${summary.skipped.length}, Errors: ${summary.errors.length}`);
    return summary;
};
