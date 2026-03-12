import { AboutSection } from "@/lib/types";

export const aboutData: AboutSection = {
  hero: {
    title: "Hi, I'm Andre",
    subtitle:
      "ML Engineer. Founder. Elite Athlete. Building the future through data, technology, and high performance.",
    cta: {
      text: "Let's Connect",
      href: "/contact",
    },
  },
  bio: {
    headline: "From Olympic Sailing to AI-Driven Performance",
    paragraphs: [
      "I'm a Full-Stack ML Engineer and Founder with a unique blend of elite athletic experience and technical expertise. My career spans from competing at the Olympic level in sailing, to building predictive AI models for health and performance optimization, to founding startups and managing real estate portfolios.",
      "Currently, I'm CEO at Persistance Health, developing machine learning models that integrate biometric, physiological, and behavioral data to deliver personalized recovery and performance insights. I'm also pursuing a Master's in Finance (specializing in Asset & Risk Management) at IESEG and contributing to cutting-edge ML research through positions at Neybor Services and CNRS.",
      "My background as an elite athlete (3rd U21 World Championships 2019, Olympic qualifier 2021) has instilled in me a deep understanding of peak performance, resilience, and the pursuit of excellence. I've translated these principles into my technical work: building systems that scale, designing models that matter, and leading teams with vision.",
      "I'm passionate about explainable AI, data engineering, and solving real-world problems through technology. Whether it's optimizing athlete performance, automating cybersecurity incident detection, or building intelligent systems, I approach each challenge with rigor, creativity, and an uncompromising commitment to quality.",
    ],
  },
  highlights: {
    title: "What I Do Best",
    items: [
      "🤖 AI/ML Engineering: Scikit-learn, TensorFlow, SHAP, LangChain, NLP",
      "🏗️ Full-Stack Development: Next.js, React, Python, Node.js, PostgreSQL",
      "📊 Data Engineering: ETL pipelines, time-series analysis, API integration",
      "🚀 Startup Building: Co-founder of Persistance Health, leading cross-disciplinary teams",
      "💼 Real Estate & Analytics: Managing €5M portfolio, building BI dashboards",
      "🏆 Performance Optimization: Olympic experience translates to system optimization",
      "📈 Strategic Thinking: Finance knowledge, risk management, portfolio analysis",
      "🔗 API & System Integration: REST, SOAP, Salesforce, multi-source data pipelines",
    ],
  },
};

export const stats = [
  { label: "Years in Tech", value: "3+" },
  { label: "ML Projects", value: "15+" },
  { label: "Startups Founded", value: "1" },
  { label: "Portfolio Value", value: "€5M" },
  { label: "Olympic Qualification", value: "2021" },
  { label: "Ultra Marathon Finishes", value: "5+" },
];

export const timeline = [
  {
    year: "2021",
    title: "Olympic Qualification",
    description: "Secured Olympic spot for Team Portugal in ILCA 7 Sailing",
  },
  {
    year: "2021-2024",
    title: "Marine Engineering",
    description: "Completed Bachelor's degree at Escola Superior Nautica (GPA 3.8)",
  },
  {
    year: "2022",
    title: "Real Estate & Startup",
    description:
      "Founded Granadeiro Property, managing €5M portfolio. Head of Analytics at Sailcoach.",
  },
  {
    year: "2024-2026",
    title: "ML & Finance Focus",
    description:
      "Master's in Finance at IESEG. Founded Persistance Health. Roles at Neybor and CNRS.",
  },
  {
    year: "2025",
    title: "CFA Level 1",
    description: "Pursuing Chartered Financial Analyst certification",
  },
  {
    year: "Present",
    title: "AI & Performance",
    description:
      "Building AI-driven health tech, researching cybersecurity, ultra-endurance athlete",
  },
];

export const testimonials = [
  {
    quote:
      "Andre's ability to combine elite sport discipline with technical excellence is rare. His understanding of performance translates directly into his engineering work.",
    author: "Team Lead",
    company: "Neybor Services",
  },
  {
    quote:
      "What impresses me most is Andre's ability to explain complex ML concepts and drive business value simultaneously.",
    author: "Research Collaborator",
    company: "CNRS",
  },
];
