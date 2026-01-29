export type DecodedJwt = {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export function getStoredAccessToken(): string | null {
  return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
}

export function clearStoredTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
}

export function decodeJwt(token: string | null | undefined): DecodedJwt | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const json = atob(payload);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getTokenExpiry(token: string | null | undefined): number | null {
  const decoded = decodeJwt(token);
  if (!decoded || typeof decoded.exp !== 'number') return null;
  return decoded.exp * 1000; // ms
}

export function isTokenExpired(token: string | null | undefined, skewMs: number = 0): boolean {
  const expiryMs = getTokenExpiry(token);
  if (!expiryMs) return true; // if unknown, treat as expired
  return Date.now() + skewMs >= expiryMs;
}


