import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { Badge } from "@/components/Shared/Badge";
import { projects } from "@/data/projects";
import { formatCategory } from "@/lib/utils";
import { SlideUp, HoverScale, StaggerContainer, AnimatedChild } from "@/components/Animations";

export const metadata = {
  title: "Projects | Andre Granadeiro",
  description: "Portfolio of AI/ML, finance, and engineering projects",
};

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <Section padding="xl">
        <Container>
          <SlideUp>
            <h1 className="text-4xl font-bold mb-2">Projects</h1>
            <p className="text-gray-400 mb-12">Featured work across AI/ML, finance, and full-stack development</p>
          </SlideUp>

          <StaggerContainer delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {projects.map((project) => (
              <AnimatedChild key={project.id}>
                <HoverScale scale={1.05}>
                  <div className="border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/50 hover:bg-gray-800/20 transition">
                    <div className="mb-4">
                      <Badge variant="primary" size="sm">
                        {formatCategory(project.category)}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="default" size="sm">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </HoverScale>
              </AnimatedChild>
            ))}
          </StaggerContainer>
        </Container>
      </Section>
    </>
  );
}
