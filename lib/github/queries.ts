/**
 * GitHub GraphQL Queries
 * For contribution heatmap and user statistics
 */

export const CONTRIBUTION_QUERY = `
  query GetContributions($userName:String!, $from:DateTime!, $to:DateTime!) {
    user(login: $userName) {
      name
      login
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      repositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          stargazerCount
          description
          url
        }
      }
    }
  }
`;

export const USER_PROFILE_QUERY = `
  query GetUserProfile($userName:String!) {
    user(login: $userName) {
      name
      login
      bio
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 1) {
        totalCount
      }
      contributionsCollection {
        totalRepositoriesWithContributedCommits
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;
