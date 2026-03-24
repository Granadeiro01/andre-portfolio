/**
 * Strava OAuth Callback Handler
 * /api/strava/callback
 *
 * Handles the OAuth redirect from Strava after user authorization
 */

import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/strava/client";
import { tokenManager } from "@/lib/strava/tokenManager";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Check for errors from Strava
    if (error) {
      const errorDescription = searchParams.get("error_description") || "Unknown error";
      console.error("Strava OAuth error:", errorDescription);

      return NextResponse.redirect(
        new URL(
          `/stats?strava_error=${encodeURIComponent(errorDescription)}`,
          request.nextUrl.origin
        )
      );
    }

    // Validate authorization code
    if (!code) {
      return NextResponse.redirect(
        new URL("/stats?strava_error=No authorization code received", request.nextUrl.origin)
      );
    }

    // Exchange code for access token
    const token = await exchangeCodeForToken(code);

    // Store token (using athlete ID as user identifier)
    const userId = token.athlete.id.toString();
    tokenManager.storeToken(userId, token);

    // Redirect back to stats page with success
    return NextResponse.redirect(
      new URL(
        `/stats?strava_success=true&athlete=${encodeURIComponent(token.athlete.firstname || "")}`,
        request.nextUrl.origin
      )
    );
  } catch (error) {
    console.error("Strava callback error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to authenticate with Strava";

    return NextResponse.redirect(
      new URL(
        `/stats?strava_error=${encodeURIComponent(errorMessage)}`,
        request.nextUrl.origin
      )
    );
  }
}
