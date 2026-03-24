import { NextRequest, NextResponse } from "next/server";
import { subMonths } from "date-fns";
import { githubCache } from "@/lib/cache/github";
import { CONTRIBUTION_QUERY } from "@/lib/github/queries";
import type { GitHubContributionsResponse, GitHubStats } from "@/types/github";

/**
 * Generate mock GitHub data for testing
 */
function generateMockGitHubData(
  username: string,
  months: number
): GitHubContributionsResponse {
  const weeks = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - months);

  let currentDate = new Date(startDate);

  // Group days into weeks
  while (currentDate < today) {
    const week = {
      contributionDays: [] as any[],
    };

    // Fill 7 days per week
    for (let i = 0; i < 7; i++) {
      if (currentDate < today) {
        const count = Math.floor(Math.random() * 25);
        week.contributionDays.push({
          date: currentDate.toISOString().split("T")[0],
          contributionCount: count,
          color: count === 0 ? "#0f1535" : "#26a641",
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    if (week.contributionDays.length > 0) {
      weeks.push(week);
    }
  }

  return {
    user: {
      name: "Andre Granadeiro",
      login: username,
      bio: "ML Engineer • Founder • Elite Athlete",
      followers: 42,
      following: 15,
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: weeks.reduce(
            (sum, week) =>
              sum +
              week.contributionDays.reduce((s, day) => s + day.contributionCount, 0),
            0
          ),
          weeks: weeks as any,
        },
      },
      repositories: {
        nodes: [
          {
            name: "andre-portfolio",
            stargazerCount: 12,
            description: "Personal portfolio with AI integration",
            url: "https://github.com/Granadeiro01/andre-portfolio",
          },
          {
            name: "ml-finance-suite",
            stargazerCount: 8,
            description: "ML models for financial analysis",
            url: "https://github.com/Granadeiro01/ml-finance-suite",
          },
          {
            name: "sailcoach-analytics",
            stargazerCount: 5,
            description: "Performance analytics for sailing",
            url: "https://github.com/Granadeiro01/sailcoach-analytics",
          },
        ],
      },
    },
  };
}

/**
 * Make GraphQL request to GitHub API
 */
async function makeGraphQLRequest(query: string, variables: Record<string, any>) {
  const endpoint = "https://api.github.com/graphql";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.GITHUB_TOKEN
        ? `Bearer ${process.env.GITHUB_TOKEN}`
        : "",
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL Error: ${data.errors[0].message}`);
  }

  return data.data;
}

/**
 * GET /api/github/contributions
 * Fetches GitHub contribution data for a user
 *
 * Query Parameters:
 * - username: GitHub username (required)
 * - months: Number of months to look back (default: 6)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");
    const months = parseInt(searchParams.get("months") || "6", 10);

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    if (months < 1 || months > 12) {
      return NextResponse.json(
        { error: "Months must be between 1 and 12" },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = { months: months.toString() };
    const cached = githubCache.get<GitHubStats>(
      "contributions",
      username,
      cacheKey
    );

    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "public, max-age=300", // 5 min browser cache
          "X-Cache-Hit": "true",
        },
      });
    }

    // Calculate date range
    const toDate = new Date();
    const fromDate = subMonths(toDate, months);

    // Fetch GitHub data (real or mock)
    let githubResponse: GitHubContributionsResponse;

    if (process.env.GITHUB_TOKEN) {
      // Use real GitHub API
      const data = await makeGraphQLRequest(CONTRIBUTION_QUERY, {
        userName: username,
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      });

      if (!data || !data.user) {
        throw new Error("GitHub user not found");
      }

      githubResponse = data as GitHubContributionsResponse;
    } else {
      // Use mock data for development/testing
      console.log("⚠️  Using mock GitHub data. Set GITHUB_TOKEN for real data.");
      githubResponse = generateMockGitHubData(username, months);
    }

    // Process response
    const { user } = githubResponse;
    const contributions = user.contributionsCollection.contributionCalendar;

    // Calculate stats
    const maxContributions = Math.max(
      ...contributions.weeks.flatMap((week) =>
        week.contributionDays.map((day) => day.contributionCount)
      ),
      0
    );

    // Calculate streak
    const allDays = contributions.weeks.flatMap((w) => w.contributionDays);
    let streak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate average
    const totalDays = allDays.filter((d) => d.date).length;
    const averagePerDay =
      totalDays > 0 ? contributions.totalContributions / totalDays : 0;

    const response: GitHubStats = {
      username: user.login,
      name: user.name,
      followers: user.contributionsCollection
        ? contributions.totalContributions
        : 0,
      following: 0,
      contributions: {
        totalContributions: contributions.totalContributions,
        weeks: contributions.weeks,
        maxContributions,
        streak,
        averagePerDay: Math.round(averagePerDay * 100) / 100,
      },
      topRepositories: user.repositories?.nodes || [],
      lastUpdated: new Date().toISOString(),
    };

    // Cache the response
    githubCache.set("contributions", username, response, cacheKey);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 min browser cache
        "X-Cache-Hit": "false",
      },
    });
  } catch (error) {
    console.error("GitHub API Error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("Could not resolve to a User")) {
        return NextResponse.json(
          { error: "GitHub user not found" },
          { status: 404 }
        );
      }

      if (error.message.includes("API rate limit exceeded")) {
        return NextResponse.json(
          {
            error: "GitHub API rate limit exceeded. Try again later.",
            retryAfter: 3600,
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to fetch GitHub data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
