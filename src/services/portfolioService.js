import { supabase, SUPABASE_BUCKET } from '../supabase';

const PORTFOLIO_SECTION_ID = 'portfolio';

const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, '_');

/**
 * Fetches the entire portfolio array from Supabase site_content table.
 */
export const fetchPortfolioData = async () => {
    const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', PORTFOLIO_SECTION_ID)
        .maybeSingle();

    if (error) {
        console.error("Error fetching portfolio data:", error);
        throw error;
    }
    if (!data) return null; // signals caller to use defaults
    return data.content?.sections || [];
};

/**
 * Fetches data for a specific section (hero, reviews, photobooth, settings).
 */
export const fetchSectionData = async (sectionId) => {
    const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', sectionId)
        .maybeSingle();

    if (error) {
        console.error(`Error fetching ${sectionId} data:`, error);
        throw error;
    }
    return data?.content || null;
};

/**
 * Overwrites the portfolio sections array in Supabase.
 */
export const savePortfolioData = async (sectionsArray) => {
    const { error } = await supabase
        .from('site_content')
        .upsert({ id: PORTFOLIO_SECTION_ID, content: { sections: sectionsArray } }, { onConflict: 'id' });

    if (error) {
        console.error("Error saving portfolio data:", error);
        throw error;
    }
};

/**
 * Saves data for a specific section.
 */
export const saveSectionData = async (sectionId, data) => {
    const { error } = await supabase
        .from('site_content')
        .upsert({ id: sectionId, content: data }, { onConflict: 'id' });

    if (error) {
        console.error(`Error saving ${sectionId} data:`, error);
        throw error;
    }
};

/**
 * Uploads a File to Supabase Storage and returns its public URL.
 */
export const uploadImage = async (file, pathPrefix = 'portfolio') => {
    const uniqueFileName = `${Date.now()}_${sanitizeFileName(file.name)}`;
    const objectPath = `${pathPrefix}/${uniqueFileName}`;

    const { error: uploadError } = await supabase
        .storage
        .from(SUPABASE_BUCKET)
        .upload(objectPath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || undefined,
        });

    if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw uploadError;
    }

    const { data } = supabase
        .storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(objectPath);

    return data.publicUrl;
};
