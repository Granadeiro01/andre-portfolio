"use client";

import React, { useEffect, useState } from "react";
import { ContributionHeatmap } from "./ContributionHeatmap";
import type { GitHubStats } from "@/types/github";

interface GitHubCardProps {
  username: string;
  months?: number;
}

/**
 * GitHub Card Component
 * Displays GitHub contribution heatmap and statistics
 */
export const GitHubCard = ({ username, months = 6 }: GitHubCardProps) => {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonths, setSelectedMonths] = useState(months);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/github/contributions?username=${username}&months=${selectedMonths}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch GitHub data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, selectedMonths]);

  if (loading) {
    return (
      <div className="w-full bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 space-y-4">
        <div className="h-6 bg-gray-700/50 rounded w-40 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded animate-pulse" />
          <div className="h-4 bg-gray-700/50 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-900/20 border border-red-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-2">GitHub Error</h3>
        <p className="text-red-300 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-700/20 border border-red-600/50 text-red-400 rounded hover:bg-red-700/30 transition-colors text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              GitHub Contributions
            </h2>
            <p className="text-gray-400 text-sm">@{data.username}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-400">
              {data.contributions.totalContributions}
            </p>
            <p className="text-gray-400 text-xs">
              contributions in {selectedMonths} months
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-gray-400 text-xs mb-1">Streak</p>
            <p className="text-xl font-bold text-green-400">
              {data.contributions.streak}
            </p>
            <p className="text-gray-500 text-xs">days</p>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-gray-400 text-xs mb-1">Max</p>
            <p className="text-xl font-bold text-blue-400">
              {data.contributions.maxContributions}
            </p>
            <p className="text-gray-500 text-xs">per day</p>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-gray-400 text-xs mb-1">Average</p>
            <p className="text-xl font-bold text-purple-400">
              {data.contributions.averagePerDay}
            </p>
            <p className="text-gray-500 text-xs">per day</p>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-300">Activity</h3>
          <div className="flex gap-2">
            {[1, 3, 6, 12].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonths(m)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  selectedMonths === m
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        <ContributionHeatmap
          weeks={data.contributions.weeks}
          maxContributions={data.contributions.maxContributions}
          isDarkMode={true}
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-900/20 border-t border-gray-700/30 flex items-center justify-between text-xs text-gray-500">
        <span>Last updated: {new Date(data.lastUpdated).toLocaleString()}</span>
        <a
          href={`https://github.com/${data.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
};
