import { NextRequest, NextResponse } from "next/server";
import { githubCache } from "@/lib/cache/github";
import { USER_PROFILE_QUERY } from "@/lib/github/queries";

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
 * GET /api/github/user
 * Fetches GitHub user profile information
 *
 * Query Parameters:
 * - username: GitHub username (required)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Check cache first (user profile changes less frequently)
    const cached = githubCache.get("profile", username);

    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "public, max-age=3600", // 1 hour browser cache
          "X-Cache-Hit": "true",
        },
      });
    }

    // Make GraphQL request
    const data = await makeGraphQLRequest(USER_PROFILE_QUERY, {
      userName: username,
    });

    const { user } = data;

    const response = {
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      totalRepositories: user.repositories.totalCount,
      contributions: {
        commits: user.contributionsCollection
          .totalRepositoriesWithContributedCommits,
        issues: user.contributionsCollection.totalIssueContributions,
        pullRequests: user.contributionsCollection.totalPullRequestContributions,
        reviews: user.contributionsCollection
          .totalPullRequestReviewContributions,
      },
      lastUpdated: new Date().toISOString(),
    };

    // Cache the response (longer TTL for profile)
    githubCache.set("profile", username, response);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, max-age=3600", // 1 hour browser cache
        "X-Cache-Hit": "false",
      },
    });
  } catch (error) {
    console.error("GitHub API Error:", error);

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
            error: "GitHub API rate limit exceeded",
            retryAfter: 3600,
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to fetch GitHub user data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
