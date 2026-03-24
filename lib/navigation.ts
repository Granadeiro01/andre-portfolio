import { NavigationItem } from "@/lib/types";

export const navigationStructure: NavigationItem[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    description: "Overview and introduction",
    keywords: [
      "home",
      "start",
      "intro",
      "introduction",
      "welcome",
      "main",
      "hero",
    ],
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    description:
      "Biography, journey from Olympic sailing to AI engineering, and unique story",
    keywords: [
      "about",
      "bio",
      "biography",
      "journey",
      "story",
      "who",
      "background",
      "experience",
      "transition",
      "sailing",
      "olympic",
      "athlete",
      "engineer",
      "founder",
      "highlights",
      "timeline",
    ],
  },
  {
    id: "experience",
    title: "Experience",
    path: "/experience",
    description:
      "Work history including roles at CNRS, Neybor, Persistance Health, real estate, and coaching",
    keywords: [
      "experience",
      "work",
      "jobs",
      "roles",
      "employment",
      "career",
      "cnrs",
      "neybor",
      "persistance",
      "granadeiro",
      "sailcoach",
      "olympic",
      "startup",
      "ceo",
      "founder",
    ],
  },
  {
    id: "projects",
    title: "Projects",
    path: "/projects",
    description:
      "Portfolio projects featuring AI/ML, finance, real estate, and sports analytics work",
    keywords: [
      "projects",
      "portfolio",
      "work",
      "showcase",
      "portfolio projects",
      "ai",
      "ml",
      "machine learning",
      "finance",
      "analytics",
      "real estate",
      "sports",
      "webapp",
      "application",
      "model",
      "system",
      "rag",
      "pipeline",
    ],
  },
  {
    id: "bookshelf",
    title: "Bookshelf",
    path: "/bookshelf",
    description:
      "Reading list, resources, and learning materials in finance, AI, sports, and philosophy",
    keywords: [
      "bookshelf",
      "books",
      "reading",
      "resources",
      "learning",
      "materials",
      "recommendations",
      "library",
      "courses",
      "papers",
      "finance",
      "ai",
      "sport",
      "philosophy",
    ],
  },
  {
    id: "stats",
    title: "Stats",
    path: "/stats",
    description: "GitHub contributions and performance analytics",
    keywords: [
      "stats",
      "statistics",
      "analytics",
      "github",
      "contributions",
      "performance",
      "metrics",
      "strava",
      "running",
    ],
  },
];

export const getNavigationItem = (id: string): NavigationItem | undefined => {
  return navigationStructure.find((item) => item.id === id);
};

export const getNavigationByPath = (path: string): NavigationItem | undefined => {
  return navigationStructure.find((item) => item.path === path);
};

/**
 * Finds best matching navigation item based on query keywords
 * Used by the AI agent to suggest relevant sections
 */
export const findRelevantSection = (query: string): NavigationItem | null => {
  const queryLower = query.toLowerCase();
  let bestMatch: NavigationItem | null = null;
  let bestScore = 0;

  navigationStructure.forEach((item) => {
    let score = 0;

    // Exact path match
    if (item.path === queryLower) {
      score = 100;
    }

    // Title match
    if (item.title.toLowerCase() === queryLower) {
      score = 90;
    }

    // Description match
    if (item.description.toLowerCase().includes(queryLower)) {
      score = 70;
    }

    // Keyword matches
    item.keywords.forEach((keyword) => {
      if (keyword.includes(queryLower) || queryLower.includes(keyword)) {
        score += 30;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });

  return bestMatch;
};

export const getNavigationMenu = (): NavigationItem[] => {
  return navigationStructure;
};
