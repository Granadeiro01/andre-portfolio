import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { Badge } from "@/components/Shared/Badge";
import { experiences } from "@/data/experience";
import { calculateDuration } from "@/lib/utils";

export const metadata = {
  title: "Experience | Andre Granadeiro",
  description: "Work history and professional experience",
};

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <Section padding="xl">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Experience</h1>
          <p className="text-gray-400 mb-12">My professional journey</p>

          <div className="space-y-8 max-w-4xl">
            {experiences.map((exp) => (
              <div key={exp.id} className="border border-gray-700/50 rounded-lg p-6 hover:bg-gray-800/30 transition">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-blue-400">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>{exp.startDate} - {exp.endDate}</p>
                    <p className="text-xs">{calculateDuration(exp.startDate, exp.endDate)}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <Badge key={tech} variant="primary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
