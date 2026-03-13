import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { aboutData } from "@/data/about";
import { SlideUp, FadeIn, StaggerContainer, AnimatedChild } from "@/components/Animations";

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
          <SlideUp>
            <h1 className="text-4xl font-bold mb-8">{aboutData.bio.headline}</h1>
          </SlideUp>
          <StaggerContainer delay={0.1}>
            <div className="prose prose-invert max-w-4xl">
              {aboutData.bio.paragraphs.map((para, idx) => (
                <AnimatedChild key={idx}>
                  <FadeIn>
                    <p className="mb-6 text-gray-300 text-lg leading-relaxed">
                      {para}
                    </p>
                  </FadeIn>
                </AnimatedChild>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>
    </>
  );
}
