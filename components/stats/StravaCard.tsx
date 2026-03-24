"use client";

import React, { useState, useCallback } from "react";
import { StravaMetrics } from "./StravaMetrics";
import { getOAuthUrl } from "@/lib/strava/client";
import type { StravaStats } from "@/types/strava";

interface StravaCardProps {
  initialData?: StravaStats;
  userId?: string;
}

/**
 * Strava Card Component
 * Displays running statistics and enables Strava OAuth connection
 */
export const StravaCard = ({ initialData, userId }: StravaCardProps) => {
  const [data, setData] = useState<StravaStats | null>(initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonths, setSelectedMonths] = useState(6);

  // Fetch Strava stats
  const fetchStravaStats = useCallback(
    async (months: number) => {
      if (!userId && !data?.athlete.id) {
        setError("No user ID available");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const athleteId = userId || data?.athlete.id.toString();
        const response = await fetch(
          `/api/strava/stats?userId=${athleteId}&months=${months}`
        );

        if (!response.ok) {
          const errorData = await response.json();

          if (response.status === 401) {
            setData(null);
            setError("Please reconnect your Strava account");
            return;
          }

          throw new Error(errorData.error || "Failed to fetch Strava data");
        }

        const result = await response.json();
        setData(result);
        setSelectedMonths(months);
      } catch (err) {
        console.error("Error fetching Strava stats:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch Strava data");
      } finally {
        setLoading(false);
      }
    },
    [userId, data?.athlete.id]
  );

  // Handle OAuth connection
  const handleConnect = useCallback(async () => {
    try {
      const oauthUrl = getOAuthUrl();
      window.location.href = oauthUrl;
    } catch (err) {
      console.error("OAuth error:", err);
      setError("Failed to initiate Strava connection");
    }
  }, []);

  // Handle disconnect
  const handleDisconnect = useCallback(() => {
    setData(null);
    setError(null);
    // TODO: Add backend endpoint to clear token
  }, []);

  // Not authenticated - show connect button
  if (!data || !data.isAuthenticated) {
    return (
      <div className="w-full bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                🏃 Strava Running Stats
              </h2>
              <p className="text-gray-400 text-sm">
                Connect your Strava account to see your running statistics
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleConnect}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-200 active:scale-95"
          >
            Connect with Strava
          </button>

          <p className="text-gray-500 text-xs mt-4 text-center">
            We&apos;ll only access your running activities. No password required.
          </p>
        </div>
      </div>
    );
  }

  // Authenticated - show stats
  return (
    <div className="w-full bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              🏃 Strava Running Stats
            </h2>
            <p className="text-gray-400 text-sm">@{data.athlete.username}</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-3 py-1 text-xs bg-gray-700/30 text-gray-400 rounded hover:bg-gray-700/50 transition-colors"
          >
            Disconnect
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-300">Activity</h3>
          <div className="flex gap-2">
            {[1, 3, 6, 12].map((m) => (
              <button
                key={m}
                onClick={() => fetchStravaStats(m)}
                disabled={loading}
                className={`px-3 py-1 text-xs rounded transition-colors disabled:opacity-50 ${
                  selectedMonths === m
                    ? "bg-orange-600 text-white"
                    : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-700/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-700/50 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      ) : error ? (
        <div className="p-6">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={() => fetchStravaStats(selectedMonths)}
            className="mt-4 px-4 py-2 bg-blue-600/30 text-blue-400 rounded text-sm hover:bg-blue-600/50 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <StravaMetrics stats={data.stats} />

          {/* Recent Activities */}
          <div className="px-6 py-4 border-t border-gray-700/30">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              Recent Runs ({data.activities.length})
            </h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {data.activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="p-3 bg-gray-900/50 rounded text-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{activity.name}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(activity.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold">
                        {(activity.distance / 1000).toFixed(2)} km
                      </p>
                      <p className="text-gray-500 text-xs">
                        {Math.floor(activity.moving_time / 60)} min
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      {data && !loading && !error && (
        <div className="px-6 py-4 bg-gray-900/20 border-t border-gray-700/30 flex items-center justify-between text-xs text-gray-500">
          <span>Last updated: {new Date(data.lastUpdated).toLocaleString()}</span>
          <a
            href={`https://www.strava.com/athletes/${data.athlete.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            View on Strava →
          </a>
        </div>
      )}
    </div>
  );
};
