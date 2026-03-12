import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "persistance-health-models",
    name: "Persistance Health - Predictive Models",
    description:
      "Personalized recovery and performance optimization using biometric, physiological, and behavioral data.",
    longDescription:
      "Machine learning models that integrate data from multiple sources (Garmin, Apple Health, TrainingPeaks) to provide personalized recovery recommendations and performance insights for elite athletes.",
    category: "ai-ml",
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "TensorFlow",
      "API Integration",
    ],
    links: {
      article: "https://persistancehealth.com",
    },
    featured: true,
    date: "2025",
  },
  {
    id: "neybor-xai-models",
    name: "Neybor - Explainable AI for Field Service",
    description:
      "xAI models using SHAP to predict and optimize task duration for field contractors with interpretability.",
    longDescription:
      "Developed explainable AI models that predict task duration for field service contractors, enabling optimization of resource allocation and scheduling. SHAP-based interpretability allows stakeholders to understand model decisions.",
    category: "ai-ml",
    techStack: ["Python", "SHAP", "XGBoost", "LangChain", "ChromaDB", "Pandas"],
    links: {
      article: "https://neybor.be",
    },
    featured: true,
    date: "2026",
  },
  {
    id: "cnrs-cybersecurity-pipeline",
    name: "CNRS Cybersecurity Incident Pipeline",
    description:
      "Automated system aggregating 10,000+ cybersecurity incidents with NLP-based classification and deduplication.",
    longDescription:
      "Built an end-to-end cybersecurity incident detection pipeline that aggregates data from multiple sources, applies TF-IDF cosine similarity for deduplication, and uses NLP for classification by incident type, sector, and severity.",
    category: "ai-ml",
    techStack: [
      "Python",
      "SQLite",
      "REST APIs",
      "NLP",
      "TF-IDF",
      "Scikit-learn",
      "Machine Learning",
    ],
    links: {},
    featured: true,
    date: "2026",
  },
  {
    id: "granadeiro-analytics",
    name: "Real Estate Analytics Dashboard",
    description:
      "Automated Power BI dashboard for portfolio optimization achieving 8% average annual yield.",
    longDescription:
      "Built a comprehensive analytics framework for real estate portfolio management, automating occupancy tracking, pricing optimization, and performance reporting. The system led to an 8% average annual yield improvement.",
    category: "finance",
    techStack: ["Power BI", "VBA", "Excel", "Data Analysis"],
    links: {},
    featured: true,
    date: "2022",
  },
  {
    id: "athlete-performance-system",
    name: "Elite Athlete Performance Analytics",
    description:
      "Comprehensive training optimization models combining GPS, heart rate, and power metrics for elite sailors.",
    longDescription:
      "Developed and implemented a performance analytics system for elite athletes, combining data from GPS tracking, heart rate monitors, and power meters to provide real-time training insights and optimization recommendations.",
    category: "sports",
    techStack: ["Python", "Data Analysis", "GPS Analytics", "Sports Science"],
    links: {},
    featured: true,
    date: "2022",
  },
  {
    id: "rag-pipeline",
    name: "RAG Pipeline with LangChain",
    description:
      "Retrieval-Augmented Generation system for context-aware document querying with ChromaDB vector database.",
    longDescription:
      "Implemented a RAG (Retrieval-Augmented Generation) pipeline using LangChain and ChromaDB to enable intelligent querying over domain-specific documents with context awareness and semantic understanding.",
    category: "ai-ml",
    techStack: ["LangChain", "ChromaDB", "Python", "NLP", "Vector Databases"],
    links: {},
    featured: false,
    date: "2026",
  },
  {
    id: "salesforce-integration",
    name: "Salesforce Field Service Integration",
    description:
      "REST/SOAP API integration connecting Salesforce Field Service with ML backend and PostgreSQL.",
    longDescription:
      "Engineered a robust integration layer connecting Salesforce Field Service with machine learning services and PostgreSQL database, enabling seamless data flow and automated optimization of field operations.",
    category: "web",
    techStack: [
      "Salesforce",
      "REST",
      "SOAP",
      "Python",
      "PostgreSQL",
      "API Development",
    ],
    links: {},
    featured: false,
    date: "2026",
  },
  {
    id: "data-pipeline",
    name: "Multi-Source Data Pipeline",
    description:
      "Integrated data pipeline combining Garmin, Apple Health, and TrainingPeaks APIs for time-series processing.",
    longDescription:
      "Built a robust data engineering pipeline that aggregates data from multiple health and fitness APIs, handles time-series data processing, and feeds into machine learning models for performance prediction.",
    category: "ai-ml",
    techStack: [
      "Python",
      "Pandas",
      "API Integration",
      "Data Engineering",
      "ETL",
    ],
    links: {},
    featured: false,
    date: "2025",
  },
];

export const getProjectsByCategory = (category: Project["category"]): Project[] => {
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getCategories = (): Project["category"][] => {
  return [...new Set(projects.map((p) => p.category))];
};
