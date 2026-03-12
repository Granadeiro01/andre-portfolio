import { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "cnrs",
    company: "CNRS HdF / Université de Lille / IÉSEG",
    title: "Research Assistant",
    location: "Brussels, Belgium",
    startDate: "Feb 2026",
    endDate: "May 2026",
    description:
      "Building automated systems for cybersecurity incident detection and classification using NLP and machine learning.",
    achievements: [
      "Built an automated cybersecurity incident pipeline in Python (SQLite, REST APIs) aggregating 10,000+ records",
      "Applied TF-IDF cosine similarity for cross-source deduplication and keyword-based NLP classification by incident type, sector, and severity",
    ],
    techStack: ["Python", "SQLite", "REST APIs", "NLP", "TF-IDF", "Machine Learning"],
    type: "internship",
  },
  {
    id: "neybor",
    company: "Neybor Services SRL",
    title: "Machine Learning Engineer (Internship)",
    location: "Brussels, Belgium",
    startDate: "Jan 2026",
    endDate: "Jul 2026",
    description:
      "Developing explainable AI models and RAG pipelines for field service optimization and resource allocation.",
    achievements: [
      "Developed and deployed xAI (explainable AI) models using SHAP to predict and optimize task duration for field contractors",
      "Built a RAG pipeline using LangChain with a vector database (ChromaDB) to enable strata-aware querying",
      "Engineered API integrations (REST/SOAP) to connect Salesforce Field Service with backend ML services and PostgreSQL database",
    ],
    techStack: [
      "Python",
      "SHAP",
      "LangChain",
      "ChromaDB",
      "Salesforce",
      "PostgreSQL",
      "REST",
      "SOAP",
      "AI/ML",
    ],
    type: "internship",
  },
  {
    id: "persistance-health",
    company: "Persistance Health (Start-up)",
    title: "Co-Founder and CEO",
    location: "Lille, France",
    startDate: "June 2025",
    endDate: "Present",
    description:
      "Leading a health-tech startup developing predictive models for personalized recovery and athletic performance optimization.",
    achievements: [
      "Developed predictive models integrating biometric, physiological, and behavioral data for personalized recovery and performance insights using Python (NumPy, Pandas, Scikit-learn)",
      "Developed data pipelines integrating multiple APIs (Garmin, Apple Health, TrainingPeaks) to process time-series data",
      "Lead a cross-disciplinary team (data scientists, medical experts, physiologists, and software engineers)",
    ],
    techStack: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "API Integration",
      "Data Engineering",
      "Leadership",
    ],
    type: "founder",
  },
  {
    id: "granadeiro-property",
    company: "Granadeiro Property",
    title: "Founder and Deal Flow Manager",
    location: "Algarve, Portugal",
    startDate: "May 2022",
    endDate: "Present",
    description:
      "Managing a €5M portfolio of mid to high-value real estate assets with focus on analytics-driven optimization.",
    achievements: [
      "Managed a portfolio of mid to high-value real estate assets (estimated value of approximately €5 million)",
      "Built an analytics framework which optimized occupancy and pricing (8% avg yield/annum)",
      "Automated reporting dashboards using Power BI and VBA",
    ],
    techStack: ["Power BI", "VBA", "Excel", "Analytics", "Real Estate Finance"],
    type: "full-time",
  },
  {
    id: "sailcoach",
    company: "Sailcoach Making You Better",
    title: "Head of Marketing & Performance Analytics",
    location: "La Valette, Malta",
    startDate: "Sep 2022",
    endDate: "Mar 2023",
    description:
      "Managed performance analytics for elite sailors, developing training optimization models based on biometric data.",
    achievements: [
      "Managed performance datasets of elite athletes; created training optimization models combining GPS, HR, and power metrics",
    ],
    techStack: ["Analytics", "Data Science", "Performance Optimization", "Sports Tech"],
    type: "full-time",
  },
  {
    id: "olympic-sailor",
    company: "Portuguese Olympic Team",
    title: "Elite ILCA 7 Sailor",
    location: "Algarve, Portugal",
    startDate: "2018",
    endDate: "2021",
    description:
      "Competed at the highest level of international sailing, securing Olympic spot for Tokyo 2021.",
    achievements: [
      "Secured the Olympic spot for Team Portugal to Tokyo 2021",
      "2nd place 2019 World championships (Split)",
      "3rd U21 at Laser U21 World Championships, Split 2019",
    ],
    techStack: ["Elite Sport", "Performance", "Coaching"],
    type: "full-time",
  },
  {
    id: "olympic-coach",
    company: "Irish Olympic Team",
    title: "World-Class Level ILCA Coach",
    location: "Dun Laoghaire, Ireland",
    startDate: "Feb 2023",
    endDate: "Dec 2023",
    description: "Coaching world-class sailors preparing for Olympic competition.",
    achievements: [
      "Coached elite ILCA sailors in preparation for Olympic Games",
    ],
    techStack: ["Coaching", "Sport Science", "Performance Optimization"],
    type: "full-time",
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};

export const getExperiencesByType = (
  type: Experience["type"]
): Experience[] => {
  return experiences.filter((exp) => exp.type === type);
};
