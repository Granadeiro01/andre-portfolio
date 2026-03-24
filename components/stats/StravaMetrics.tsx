"use client";

import React from "react";
import type { AggregatedRunStats } from "@/types/strava";

interface StravaMetricsProps {
  stats: AggregatedRunStats;
}

/**
 * Strava Metrics Component
 * Displays running statistics in card format
 */
export const StravaMetrics = ({ stats }: StravaMetricsProps) => {
  const metricsCards = [
    {
      label: "Total Runs",
      value: stats.totalActivities.toString(),
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      label: "Total Distance",
      value: `${stats.totalKilometers} km`,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      label: "Total Time",
      value: `${stats.totalHours}h ${stats.totalMinutes % 60}m`,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      label: "Avg Pace",
      value: stats.averagePace,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
    },
    {
      label: "Longest Run",
      value: `${stats.longestRun} km`,
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
    },
    {
      label: "Fastest Pace",
      value: stats.fastestPace,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metricsCards.map((card) => (
          <div key={card.label} className={`${card.bgColor} rounded-lg p-4 border border-gray-700/30`}>
            <p className="text-gray-400 text-xs mb-2">{card.label}</p>
            <p className={`${card.color} text-lg sm:text-xl font-bold`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Breakdown */}
      {stats.monthlyBreakdown.length > 0 && (
        <div className="border-t border-gray-700/30 pt-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Monthly Breakdown
          </h3>
          <div className="space-y-3">
            {stats.monthlyBreakdown
              .slice()
              .reverse()
              .slice(0, 6)
              .map((month) => {
                const monthDate = new Date(`${month.month}-01`);
                const monthName = monthDate.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });

                // Calculate progress bar width (relative to max km in breakdown)
                const maxKm = Math.max(
                  ...stats.monthlyBreakdown.map((m) => m.kilometers)
                );
                const percentage = (month.kilometers / maxKm) * 100;

                return (
                  <div key={month.month}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">{monthName}</span>
                      <span className="text-sm font-semibold text-blue-400">
                        {month.kilometers} km
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{month.count} runs</span>
                      <span>{month.hours}h {month.minutes}m</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Other Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-700/30 pt-6">
        <div className="bg-gray-900/50 rounded p-4">
          <p className="text-gray-400 text-xs mb-2">Avg Distance</p>
          <p className="text-lg font-bold text-blue-400">
            {stats.averageDistance} km
          </p>
        </div>
        <div className="bg-gray-900/50 rounded p-4">
          <p className="text-gray-400 text-xs mb-2">Avg Duration</p>
          <p className="text-lg font-bold text-blue-400">
            {stats.averageMovingTime} min
          </p>
        </div>
        <div className="bg-gray-900/50 rounded p-4">
          <p className="text-gray-400 text-xs mb-2">Elevation Gain</p>
          <p className="text-lg font-bold text-blue-400">
            {stats.totalElevationGain} m
          </p>
        </div>
        <div className="bg-gray-900/50 rounded p-4">
          <p className="text-gray-400 text-xs mb-2">Total Time</p>
          <p className="text-lg font-bold text-blue-400">
            {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
          </p>
        </div>
      </div>
    </div>
  );
};
