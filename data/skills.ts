import { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      "English (Native)",
      "Portuguese (Native)",
      "French (C2)",
      "Spanish (C2)",
    ],
  },
  {
    category: "Programming Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "VBA", "Apex"],
  },
  {
    category: "AI/ML & Data Science",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "SHAP",
      "Pandas",
      "NumPy",
      "NLP",
      "LangChain",
      "LlamaIndex",
    ],
  },
  {
    category: "Web Development",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      "PostgreSQL",
      "SQLite",
      "ChromaDB",
      "Firebase",
      "Vector Databases",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Azure", "Vercel", "AWS", "CI/CD", "GitHub Actions"],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Power BI",
      "Excel",
      "Salesforce",
      "Postman",
      "Linear",
      "Jira",
    ],
  },
  {
    category: "Analytics & Finance",
    skills: [
      "Bloomberg",
      "Refinitiv",
      "Portfolio Analytics",
      "Risk Management",
      "Time-series Analysis",
      "Performance Metrics",
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      "Leadership",
      "Team Management",
      "Startup Building",
      "Strategic Planning",
      "Cross-functional Collaboration",
      "Technical Mentoring",
    ],
  },
  {
    category: "Specializations",
    skills: [
      "Explainable AI (xAI)",
      "Data Pipeline Development",
      "API Integration",
      "Performance Optimization",
      "Cybersecurity Analytics",
      "Sports Performance Analytics",
    ],
  },
];

export const getSkillsByCategory = (category: string): string[] => {
  const group = skills.find((s) => s.category === category);
  return group?.skills || [];
};

export const getAllSkills = (): string[] => {
  return skills.flatMap((s) => s.skills);
};

export const getCategories = (): string[] => {
  return skills.map((s) => s.category);
};
