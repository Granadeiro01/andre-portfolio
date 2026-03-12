import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Button } from "@/components/Shared/Button";
import { Section } from "@/components/Shared/Section";

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <Section padding="xl" background="transparent" className="min-h-[calc(100vh-80px)] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-3xl blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/5 rounded-3xl blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-3xl blur-3xl animate-pulse-slow" />
        </div>

        <Container maxWidth="2xl">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Hi, I&apos;m Andre
              </h1>

              {/* Subtitle with typing effect */}
              <div className="flex flex-col gap-2 text-lg sm:text-2xl text-gray-400">
                <p>ML Engineer • Founder • Elite Athlete</p>
                <p className="text-blue-400">Building the future through data & technology</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/projects">
                <Button size="lg">View My Work</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Get In Touch</Button>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">15+</p>
                <p className="text-sm sm:text-base text-gray-500">ML Projects</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">€5M</p>
                <p className="text-sm sm:text-base text-gray-500">Portfolio Value</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">2021</p>
                <p className="text-sm sm:text-base text-gray-500">Olympics</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="hidden sm:flex justify-center pt-8">
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Section Preview */}
      <Section padding="lg" background="dark" id="featured">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI/ML models, data engineering, and strategic insights across health tech, finance, and cybersecurity
            </p>
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button>Explore All Projects</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
