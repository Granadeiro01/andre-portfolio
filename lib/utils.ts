/**
 * Utility functions for the portfolio
 */

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const formatDate = (dateString: string): string => {
  // Handle format like "Feb 2026" or "May 2022"
  return dateString;
};

export const calculateDuration = (startDate: string, endDate: string): string => {
  if (endDate === "Present") {
    return "Ongoing";
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [startMonth, startYear] = startDate.split(" ");
  const [endMonth, endYear] = endDate.split(" ");

  if (!startMonth || !startYear || !endMonth || !endYear) {
    return "Duration unknown";
  }

  const startMonthIndex = months.indexOf(startMonth);
  const endMonthIndex = months.indexOf(endMonth);

  const startDate_ = new Date(parseInt(startYear), startMonthIndex);
  const endDate_ = new Date(parseInt(endYear), endMonthIndex);

  const diffTime = Math.abs(endDate_.getTime() - startDate_.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

  if (diffMonths < 1) return "< 1 month";
  if (diffMonths < 12) return `${diffMonths} months`;

  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;

  if (remainingMonths === 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  return `${years}y ${remainingMonths}m`;
};

export const scrollToElement = (elementId: string, offset = 80): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
};

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "ai-ml": "AI/ML",
    "real-estate": "Real Estate",
    sports: "Sports",
    finance: "Finance",
    web: "Web",
    misc: "Misc",
  };

  return categoryMap[category] || capitalize(category.replace(/-/g, " "));
};

/**
 * Check if the app is running in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === "development";
};

/**
 * Get current domain for absolute URLs
 */
export const getSiteUrl = (): string => {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
};

/**
 * Generate absolute URL
 */
export const getAbsoluteUrl = (path: string): string => {
  const baseUrl = getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${baseUrl}${path}`;
};

/**
 * Simple debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Simple throttle function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
