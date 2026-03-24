/**
 * GET /api/strava/stats
 * Fetches aggregated running statistics for the authenticated user
 *
 * Query Parameters:
 * - userId: Strava athlete ID (required)
 * - months: Number of months to look back (default: 6)
 */

import { NextRequest, NextResponse } from "next/server";
import { getActivities, getAthlete, aggregateRunStats } from "@/lib/strava/client";
import { tokenManager } from "@/lib/strava/tokenManager";
import type { StravaStats, StravaAthlete } from "@/types/strava";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const months = parseInt(searchParams.get("months") || "6", 10);

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    if (months < 1 || months > 24) {
      return NextResponse.json(
        { error: "Months must be between 1 and 24" },
        { status: 400 }
      );
    }

    // Get valid token (refreshes if needed)
    const token = await tokenManager.getValidToken(userId);

    if (!token) {
      return NextResponse.json(
        {
          error: "Not authenticated",
          isAuthenticated: false,
        },
        { status: 401 }
      );
    }

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (token.expires_at < now) {
      tokenManager.removeToken(userId);
      return NextResponse.json(
        {
          error: "Session expired. Please reconnect your Strava account.",
          isAuthenticated: false,
        },
        { status: 401 }
      );
    }

    // Fetch athlete profile and activities
    const [athlete, activities] = await Promise.all([
      getAthlete(token.access_token),
      getActivities(token.access_token, undefined, 500),
    ]) as [StravaAthlete, any[]];

    // Filter activities from the requested time period
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);
    const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);

    const recentActivities = activities.filter((activity) => {
      const activityDate = new Date(activity.start_date);
      return Math.floor(activityDate.getTime() / 1000) >= cutoffTimestamp;
    });

    // Aggregate statistics
    const stats = aggregateRunStats(recentActivities);

    const response: StravaStats = {
      athlete: {
        id: athlete.id,
        name: `${athlete.firstname} ${athlete.lastname}`,
        username: athlete.username,
        profile: athlete.profile,
        city: athlete.city,
        state: athlete.state,
      },
      stats,
      activities: recentActivities.slice(0, 10), // Return last 10 for display
      lastUpdated: new Date().toISOString(),
      isAuthenticated: true,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 min cache
      },
    });
  } catch (error) {
    console.error("Strava stats error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        return NextResponse.json(
          {
            error: "Strava session expired. Please reconnect.",
            isAuthenticated: false,
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to fetch Strava statistics",
        details: error instanceof Error ? error.message : "Unknown error",
        isAuthenticated: false,
      },
      { status: 500 }
    );
  }
}
