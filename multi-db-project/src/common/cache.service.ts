import * as NodeCache from 'node-cache';

export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new (NodeCache as any)(); // 👈 Force constructable
  }

  set(key: string, value: any, ttlSeconds: number): void {
    this.cache.set(key, value, ttlSeconds);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  del(key: string): number {
    return this.cache.del(key);
  }
}
