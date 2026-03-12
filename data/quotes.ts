import { Quote } from "@/lib/types";

export const quotes: Quote[] = [
  {
    text: "A computer once beat me at chess, but it was no match for me at kickboxing.",
    author: "Emo Philips",
    category: "technical",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivational",
  },
  {
    text: "Where I feel most alive. Where I can push my limits. Where I'm in control and in peace with myself.",
    author: "Andre Granadeiro",
    category: "personal",
  },
  {
    text: "Excellence is not a skill, it's a habit. You are what you repeatedly do.",
    author: "Aristotle",
    category: "motivational",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "motivational",
  },
  {
    text: "Data is the new oil, but only if it flows.",
    author: "Data Science Insight",
    category: "technical",
  },
  {
    text: "In sailing, like in life, you must adjust to the winds you cannot control.",
    author: "Sailing Wisdom",
    category: "personal",
  },
  {
    text: "Complexity is the enemy of execution.",
    author: "Tech Wisdom",
    category: "technical",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Sports Philosophy",
    category: "motivational",
  },
  {
    text: "Build things that matter. Build them right.",
    author: "Engineering Principle",
    category: "personal",
  },
  {
    text: "First principles thinking beats conventional wisdom every time.",
    author: "Problem Solving",
    category: "technical",
  },
  {
    text: "Performance is the sum of small, consistent disciplines over time.",
    author: "Athletic Wisdom",
    category: "sport",
  },
];

/**
 * Get quote of the day based on current date
 * Uses hash function to ensure consistent quote for entire day
 */
export const getQuoteOfTheDay = (): Quote => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % quotes.length;
  return quotes[index];
};

export const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getQuotesByCategory = (category: Quote["category"]): Quote[] => {
  return quotes.filter((q) => q.category === category);
};
