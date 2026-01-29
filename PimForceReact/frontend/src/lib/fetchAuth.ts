import { clearStoredTokens } from './auth';

export function setupAuthFetchInterceptor(): void {
  if (typeof window === 'undefined' || typeof window.fetch !== 'function') return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const response = await originalFetch(input, init);

    if (response.status === 401) {
      clearStoredTokens();
      if (window.location.pathname !== '/') {
        window.location.replace('/');
      }
    }

    return response;
  };
}


