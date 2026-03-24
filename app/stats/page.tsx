import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { GitHubCard } from "@/components/stats/GitHubCard";
import { StravaCard } from "@/components/stats/StravaCard";

export const metadata = {
  title: "Statistics | Andre Granadeiro",
  description: "GitHub contributions, running statistics, and performance analytics",
};

export default function StatsPage() {
  return (
    <>
      <Navigation />

      <Section padding="xl" background="transparent">
        <Container maxWidth="2xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold">Statistics</h1>
              <p className="text-gray-400 text-lg">
                GitHub contributions, running stats, and performance metrics
              </p>
            </div>

            {/* GitHub Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">GitHub Activity</h2>
              <GitHubCard username="Granadeiro01" months={12} />
            </div>

            {/* Strava Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Running Activity</h2>
              <StravaCard />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
