/**
 * Strava API Client
 * Handles all Strava API interactions
 */

import type { StravaActivity, StravaTokenResponse } from "@/types/strava";

const STRAVA_API_BASE = "https://www.strava.com/api/v3";
const STRAVA_OAUTH_BASE = "https://www.strava.com/api/v3/oauth";

/**
 * Make authenticated request to Strava API
 */
async function makeStravaRequest<T>(
  endpoint: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${STRAVA_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Access token may have expired");
    }
    throw new Error(`Strava API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Get OAuth authorization URL
 */
export function getOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID || "",
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/strava/callback`,
    response_type: "code",
    scope: "activity:read_all",
    state: Math.random().toString(36).substring(7),
  });

  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<StravaTokenResponse> {
  const response = await fetch(`${STRAVA_OAUTH_BASE}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID || "",
      client_secret: process.env.STRAVA_CLIENT_SECRET || "",
      code,
      grant_type: "authorization_code",
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${response.statusText}`);
  }

  return response.json() as Promise<StravaTokenResponse>;
}

/**
 * Get activities for a user
 */
export async function getActivities(
  accessToken: string,
  beforeDate?: number,
  limit: number = 200
): Promise<StravaActivity[]> {
  const params = new URLSearchParams({
    per_page: limit.toString(),
    page: "1",
  });

  if (beforeDate) {
    params.append("before", beforeDate.toString());
  }

  return makeStravaRequest<StravaActivity[]>(
    `/athlete/activities?${params.toString()}`,
    accessToken
  );
}

/**
 * Get current athlete profile
 */
export async function getAthlete(accessToken: string) {
  return makeStravaRequest(`/athlete`, accessToken);
}

/**
 * Filter running activities
 */
export function filterRunningActivities(activities: StravaActivity[]): StravaActivity[] {
  return activities.filter(
    (activity) =>
      activity.type === "Run" ||
      activity.type === "TrailRun" ||
      activity.name.toLowerCase().includes("run")
  );
}

/**
 * Calculate pace (mm:ss per km) from speed
 */
function calculatePace(averageSpeed: number): string {
  // average_speed is in m/s, we need minutes per km
  if (averageSpeed === 0) return "--:--";

  const kmPerHour = averageSpeed * 3.6;
  const minutesPerKm = 60 / kmPerHour;
  const minutes = Math.floor(minutesPerKm);
  const seconds = Math.round((minutesPerKm - minutes) * 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Aggregate running statistics from activities
 */
export function aggregateRunStats(activities: StravaActivity[]) {
  const runningActivities = filterRunningActivities(activities);

  if (runningActivities.length === 0) {
    return {
      totalActivities: 0,
      totalKilometers: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalElevationGain: 0,
      averagePace: "--:--",
      averageDistance: 0,
      averageMovingTime: 0,
      longestRun: 0,
      fastestPace: "--:--",
      monthlyBreakdown: [],
    };
  }

  // Calculate totals
  const totalDistance = runningActivities.reduce((sum, a) => sum + a.distance, 0);
  const totalMovingTime = runningActivities.reduce((sum, a) => sum + a.moving_time, 0);
  const totalElevation = runningActivities.reduce((sum, a) => sum + a.total_elevation_gain, 0);

  const totalKm = totalDistance / 1000;
  const totalHours = Math.floor(totalMovingTime / 3600);

  // Calculate averages
  const averageDistance = totalKm / runningActivities.length;
  const averageMovingTime = totalMovingTime / runningActivities.length / 60; // in minutes
  const averageSpeed = totalDistance / totalMovingTime; // m/s
  const averagePace = calculatePace(averageSpeed);

  // Find longest and fastest
  const longestRun = Math.max(...runningActivities.map((a) => a.distance)) / 1000;
  const fastestActivity = runningActivities.reduce((prev, current) =>
    current.average_speed > prev.average_speed ? current : prev
  );
  const fastestPace = calculatePace(fastestActivity.average_speed);

  // Group by month
  const monthlyMap = new Map<string, { count: number; distance: number; time: number }>();

  runningActivities.forEach((activity) => {
    const date = new Date(activity.start_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const existing = monthlyMap.get(monthKey) || { count: 0, distance: 0, time: 0 };
    existing.count += 1;
    existing.distance += activity.distance / 1000;
    existing.time += activity.moving_time / 60;

    monthlyMap.set(monthKey, existing);
  });

  const monthlyBreakdown = Array.from(monthlyMap.entries())
    .map(([month, data]) => ({
      month,
      count: data.count,
      kilometers: Math.round(data.distance * 10) / 10,
      hours: Math.floor(data.time / 60),
      minutes: Math.round(data.time % 60),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return {
    totalActivities: runningActivities.length,
    totalKilometers: Math.round(totalKm * 10) / 10,
    totalHours,
    totalMinutes: Math.round(totalMovingTime / 60),
    totalElevationGain: Math.round(totalElevation),
    averagePace,
    averageDistance: Math.round(averageDistance * 10) / 10,
    averageMovingTime: Math.round(averageMovingTime),
    longestRun: Math.round(longestRun * 10) / 10,
    fastestPace,
    monthlyBreakdown,
  };
}
