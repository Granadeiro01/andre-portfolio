import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { GitHubCard } from "@/components/stats/GitHubCard";

export const metadata = {
  title: "Statistics | Andre Granadeiro",
  description: "GitHub contributions and performance analytics",
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

            {/* Future: Strava Stats */}
            <div className="p-6 bg-gray-800/30 border border-gray-700/50 rounded-lg text-center">
              <p className="text-gray-400">
                🏃 Strava running statistics coming soon...
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
