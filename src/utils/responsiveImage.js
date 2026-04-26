const UNSPLASH_WIDTHS = [320, 480, 640, 800, 1200, 1600];

const isUnsplash = (url) => typeof url === 'string' && url.includes('unsplash');

/**
 * Build srcSet/sizes for an Unsplash image. For non-Unsplash URLs (Supabase
 * Storage, local imports), returns just `src` so the browser loads the original.
 *
 *   const { src, srcSet, sizes } = responsiveImage(url, '(max-width: 768px) 100vw, 50vw');
 *   <img src={src} srcSet={srcSet} sizes={sizes} alt="..." />
 */
export const responsiveImage = (url, sizes) => {
    if (!isUnsplash(url)) return { src: url };

    const base = url.split('&w=')[0];
    const srcSet = UNSPLASH_WIDTHS.map(w => `${base}&w=${w} ${w}w`).join(', ');
    return {
        src: `${base}&w=1200`,
        srcSet,
        sizes,
    };
};
