// src/config.ts
const viteEnv = (import.meta as any)?.env;
const viteApiBase = (viteEnv?.VITE_API_BASE as string | undefined) ?? (viteEnv?.BASE_URL as string | undefined);

// Fallback stays localhost if nothing set
export const API_BASE = viteApiBase ?? "http://localhost";

/** Join base + path safely: buildUrl("/api/integrations/") */
export function buildUrl(path: string) {
  const base = API_BASE.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}