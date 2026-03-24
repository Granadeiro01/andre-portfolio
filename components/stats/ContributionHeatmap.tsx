"use client";

import React from "react";
import { ContributionWeek, ContributionDay } from "@/types/github";

interface ContributionHeatmapProps {
  weeks: ContributionWeek[];
  maxContributions: number;
  isDarkMode?: boolean;
}

/**
 * Contribution Heatmap Component
 * Renders GitHub contribution calendar in a grid format
 */
export const ContributionHeatmap = ({
  weeks,
  maxContributions,
  isDarkMode = true,
}: ContributionHeatmapProps) => {
  /**
   * Get color intensity based on contribution count
   * Uses a 5-level color scale similar to GitHub
   */
  const getColor = (count: number): string => {
    if (count === 0) {
      return isDarkMode ? "#0f1535" : "#ebedf0";
    }

    const intensity = count / Math.max(maxContributions, 1);

    if (isDarkMode) {
      // Dark mode colors (greenish)
      if (intensity < 0.25) return "#0d3922";
      if (intensity < 0.5) return "#0e6251";
      if (intensity < 0.75) return "#05a856";
      return "#26a641";
    } else {
      // Light mode colors
      if (intensity < 0.25) return "#c6e48b";
      if (intensity < 0.5) return "#7bc96f";
      if (intensity < 0.75) return "#239a3b";
      return "#196127";
    }
  };

  /**
   * Get the tooltip text for a day
   */
  const getTooltipText = (day: ContributionDay): string => {
    const date = new Date(day.date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateStr = date.toLocaleDateString("en-US", options);
    return `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${dateStr}`;
  };

  const daysPerWeek = 7;
  const cellSize = 12;
  const cellGap = 2;

  return (
    <div className="w-full overflow-x-auto pb-4">
      <svg
        width={weeks.length * (cellSize + cellGap) + cellGap}
        height={daysPerWeek * (cellSize + cellGap) + cellGap + 24}
        className="font-xs text-gray-400"
      >
        {/* Day labels (Sun, Mon, Tue, Wed, Thu, Fri, Sat) */}
        {["Sun", "Mon", "Wed", "Fri"].map((day) => (
          <text
            key={`day-${day}`}
            x={-8}
            y={
              cellGap +
              cellSize / 2 +
              (day === "Sun" ? 0 : day === "Mon" ? cellSize + cellGap : day === "Wed" ? (cellSize + cellGap) * 2 : (cellSize + cellGap) * 4) +
              4
            }
            textAnchor="end"
            fontSize="12"
            fill={isDarkMode ? "#6b7280" : "#57606a"}
          >
            {day}
          </text>
        ))}

        {/* Contribution cells */}
        {weeks.map((week, weekIndex) => (
          <g key={`week-${weekIndex}`}>
            {week.contributionDays.map((day, dayIndex) => (
              <g key={`day-${weekIndex}-${dayIndex}`}>
                <rect
                  x={cellGap + weekIndex * (cellSize + cellGap)}
                  y={cellGap + dayIndex * (cellSize + cellGap)}
                  width={cellSize}
                  height={cellSize}
                  fill={getColor(day.contributionCount)}
                  rx="2"
                  className="hover:opacity-80 transition-opacity cursor-pointer stroke-current"
                  strokeWidth="1"
                  stroke={isDarkMode ? "#374151" : "#d1d5da"}
                >
                  <title>{getTooltipText(day)}</title>
                </rect>
              </g>
            ))}
          </g>
        ))}

        {/* Legend */}
        <g>
          <text
            x={cellGap}
            y={daysPerWeek * (cellSize + cellGap) + cellGap + 20}
            fontSize="12"
            fill={isDarkMode ? "#6b7280" : "#57606a"}
          >
            Less
          </text>

          {[0, 1, 2, 3, 4].map((level) => (
            <rect
              key={`legend-${level}`}
              x={cellGap + 40 + level * (cellSize + cellGap)}
              y={daysPerWeek * (cellSize + cellGap) + cellGap + 8}
              width={cellSize}
              height={cellSize}
              fill={getColor(
                level === 0
                  ? 0
                  : (level / 4) * Math.max(maxContributions, 1)
              )}
              rx="2"
              stroke={isDarkMode ? "#374151" : "#d1d5da"}
              strokeWidth="1"
            />
          ))}

          <text
            x={cellGap + 40 + 5 * (cellSize + cellGap) + cellGap}
            y={daysPerWeek * (cellSize + cellGap) + cellGap + 20}
            fontSize="12"
            fill={isDarkMode ? "#6b7280" : "#57606a"}
          >
            More
          </text>
        </g>
      </svg>
    </div>
  );
};
