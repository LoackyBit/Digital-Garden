/**
 * Prefixes an absolute internal path with Astro's base URL.
 * This keeps links working when the site is served from a subpath (e.g. GitHub Pages project sites).
 */
export const withBase = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = import.meta.env.BASE_URL ?? "/";

  if (baseUrl === "/") {
    return normalizedPath;
  }

  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  if (
    normalizedPath === normalizedBase ||
    normalizedPath.startsWith(`${normalizedBase}/`)
  ) {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}`;
};
