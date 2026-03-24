/**
 * GitHub API Response Types
 */

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionCollection {
  contributionCalendar: ContributionCalendar;
}

export interface GitHubRepository {
  name: string;
  stargazerCount: number;
  description?: string;
  url?: string;
}

export interface GitHubUser {
  name: string;
  login: string;
  bio?: string;
  followers: number;
  following: number;
  contributionsCollection: ContributionCollection;
  repositories?: {
    nodes: GitHubRepository[];
  };
}

export interface GitHubContributionsResponse {
  user: GitHubUser;
}

/**
 * Processed data for frontend consumption
 */
export interface ProcessedContributions {
  totalContributions: number;
  weeks: ContributionWeek[];
  maxContributions: number;
  streak: number;
  averagePerDay: number;
}

export interface GitHubStats {
  username: string;
  name: string;
  followers: number;
  following: number;
  contributions: ProcessedContributions;
  topRepositories?: GitHubRepository[];
  lastUpdated: string;
}
