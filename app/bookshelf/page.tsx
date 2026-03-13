import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { Button } from "@/components/Shared/Button";
import { SlideUp, StaggerContainer, AnimatedChild } from "@/components/Animations";

export const metadata = {
  title: "Bookshelf | Andre Granadeiro",
  description: "Books, resources, and learning materials",
};

export default function BookshelfPage() {
  const categories = ["Finance", "AI/ML", "Sports", "Philosophy", "Leadership"];

  return (
    <>
      <Navigation />
      <Section padding="xl">
        <Container>
          <SlideUp>
            <h1 className="text-4xl font-bold mb-2">Bookshelf</h1>
            <p className="text-gray-400 mb-12">Reading list and resources I&apos;m currently exploring</p>
          </SlideUp>

          <StaggerContainer delay={0.1} className="max-w-4xl">
            <AnimatedChild>
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8 text-center mb-12">
                <p className="text-gray-400 mb-6">
                  This section is currently being populated with my reading recommendations, courses, and resources across multiple domains.
                </p>
                <Button variant="outline">
                  Check back soon
                </Button>
              </div>
            </AnimatedChild>

            <AnimatedChild>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-4 text-center text-sm text-gray-400"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </AnimatedChild>
          </StaggerContainer>
        </Container>
      </Section>
    </>
  );
}
