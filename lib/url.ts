export function getPublicProfileUrl(slug: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/p/${slug}`;
  }

  return `/p/${slug}`;
}