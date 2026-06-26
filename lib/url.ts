export function getPublicProfileUrl(slug: string) {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  return `${baseUrl}/p/${slug}`;
}