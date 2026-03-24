/**
 * GitHub Cache Manager
 * Handles in-memory caching for GitHub API responses
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class GitHubCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Determine cache TTL based on environment
   * Development: 5 minutes (frequent updates)
   * Production: 60 minutes (less frequent updates)
   */
  private getTTL(): number {
    const isDev = process.env.NODE_ENV === "development";
    return isDev ? 5 * 60 * 1000 : 60 * 60 * 1000; // 5 min or 60 min in ms
  }

  /**
   * Generate cache key from username and parameters
   */
  private generateKey(
    endpoint: "contributions" | "profile",
    username: string,
    params?: Record<string, string>
  ): string {
    const paramStr = params
      ? Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join("&")
      : "";
    return `gh:${endpoint}:${username}${paramStr ? `:${paramStr}` : ""}`;
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  /**
   * Get from cache
   */
  get<T>(
    endpoint: "contributions" | "profile",
    username: string,
    params?: Record<string, string>
  ): T | null {
    const key = this.generateKey(endpoint, username, params);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (!this.isValid(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set in cache
   */
  set<T>(
    endpoint: "contributions" | "profile",
    username: string,
    data: T,
    params?: Record<string, string>
  ): void {
    const key = this.generateKey(endpoint, username, params);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: this.getTTL(),
    });
  }

  /**
   * Clear specific cache entry
   */
  clear(
    endpoint: "contributions" | "profile",
    username: string,
    params?: Record<string, string>
  ): void {
    const key = this.generateKey(endpoint, username, params);
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats (for debugging)
   */
  getStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }
}

export const githubCache = new GitHubCache();
