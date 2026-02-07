/**
 * Robust utility for generating SEO-friendly slugs from strings.
 * Handles accents, special characters, and multiple languages.
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  
  return text
    .toString()
    .normalize('NFD')                   // Split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '')     // Remove diacritical marks
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w-]+/g, '')             // Remove all non-word chars
    .replace(/--+/g, '-')                // Replace multiple - with single -
    .replace(/^-+/, '')                  // Trim - from start of text
    .replace(/-+$/, '');                 // Trim - from end of text
};

/**
 * Utility to check if a string is a potential ID (UUID or custom pattern)
 * vs a human-readable slug.
 */
export const isResourceId = (str: string): boolean => {
  // Check for standard UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  // Check for our custom patterns (e.g., res-..., prov-..., u-...)
  const customIdRegex = /^(res|prov|u|blog|cp)-.+/i;
  
  return uuidRegex.test(str) || customIdRegex.test(str);
};
