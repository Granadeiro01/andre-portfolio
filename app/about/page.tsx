import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { aboutData } from "@/data/about";

export const metadata = {
  title: "About Andre | ML Engineer & Founder",
  description: "Learn about my journey from elite sailing to AI engineering",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <Section padding="xl">
        <Container>
          <h1 className="text-4xl font-bold mb-8">{aboutData.bio.headline}</h1>
          <div className="prose prose-invert max-w-4xl">
            {aboutData.bio.paragraphs.map((para, idx) => (
              <p key={idx} className="mb-6 text-gray-300 text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
