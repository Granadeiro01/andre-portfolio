/**
 * Strava Token Management
 * Handles secure storage and refresh of Strava access tokens
 */

import type { StravaTokenResponse } from "@/types/strava";

/**
 * Token storage interface
 * In production, this should use a database
 * For now, we'll use a Map for demonstration
 */
class TokenManager {
  private tokens: Map<string, StravaTokenResponse> = new Map();
  private tokenExpiryWarning = 3600; // 1 hour warning before expiry

  /**
   * Store a token for a user
   */
  storeToken(userId: string, token: StravaTokenResponse): void {
    this.tokens.set(userId, token);
    console.log(`✓ Token stored for user ${userId}`);
  }

  /**
   * Retrieve a token for a user
   */
  getToken(userId: string): StravaTokenResponse | null {
    return this.tokens.get(userId) || null;
  }

  /**
   * Check if token needs refresh (expires within 1 hour)
   */
  needsRefresh(token: StravaTokenResponse): boolean {
    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = token.expires_at - now;
    return timeUntilExpiry < this.tokenExpiryWarning;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(token: StravaTokenResponse): Promise<StravaTokenResponse> {
    try {
      const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.STRAVA_CLIENT_ID || "",
          client_secret: process.env.STRAVA_CLIENT_SECRET || "",
          refresh_token: token.refresh_token,
          grant_type: "refresh_token",
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const newToken = (await response.json()) as StravaTokenResponse;
      console.log("✓ Token refreshed successfully");
      return newToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  }

  /**
   * Get valid token (refresh if needed)
   */
  async getValidToken(userId: string): Promise<StravaTokenResponse | null> {
    const token = this.getToken(userId);

    if (!token) {
      return null;
    }

    if (this.needsRefresh(token)) {
      try {
        const refreshedToken = await this.refreshToken(token);
        this.storeToken(userId, refreshedToken);
        return refreshedToken;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        // Return expired token anyway - caller will handle the error
        return token;
      }
    }

    return token;
  }

  /**
   * Remove token for a user (logout)
   */
  removeToken(userId: string): void {
    this.tokens.delete(userId);
    console.log(`✓ Token removed for user ${userId}`);
  }

  /**
   * Get all stored tokens (for debugging)
   */
  getAllTokens(): Map<string, StravaTokenResponse> {
    return this.tokens;
  }

  /**
   * Clear all tokens
   */
  clearAll(): void {
    this.tokens.clear();
    console.log("✓ All tokens cleared");
  }
}

export const tokenManager = new TokenManager();
