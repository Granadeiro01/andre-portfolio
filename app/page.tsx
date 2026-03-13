import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Button } from "@/components/Shared/Button";
import { Section } from "@/components/Shared/Section";
import { HomeChat } from "@/components/HomeChat";
import { VideoBackground } from "@/components/VideoBackground";
import {
  SlideUp,
  StaggerContainer,
  AnimatedChild,
  HoverScale,
} from "@/components/Animations";

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section with Chat */}
      <Section padding="xl" background="transparent" className="min-h-screen flex items-center">
        {/* Video Background */}
        <VideoBackground />

        <Container maxWidth="2xl">
          <div className="space-y-12">
            {/* Top Section - Introduction */}
            <SlideUp>
              <div className="text-center space-y-6">
                {/* Main heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Hi, I&apos;m Andre
                  </h1>

                  {/* Subtitle */}
                  <div className="flex flex-col gap-2 text-lg sm:text-xl text-gray-400">
                    <p>ML Engineer • Founder • Elite Athlete</p>
                    <p className="text-blue-400">Building the future through data & technology</p>
                  </div>
                </div>

                {/* Quick stats */}
                <StaggerContainer delay={0.1} className="pt-8">
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
                    <AnimatedChild>
                      <HoverScale scale={1.05}>
                        <div>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-400">15+</p>
                          <p className="text-sm sm:text-base text-gray-500">ML Projects</p>
                        </div>
                      </HoverScale>
                    </AnimatedChild>
                    <AnimatedChild>
                      <HoverScale scale={1.05}>
                        <div>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-400">€5M</p>
                          <p className="text-sm sm:text-base text-gray-500">Portfolio Value</p>
                        </div>
                      </HoverScale>
                    </AnimatedChild>
                    <AnimatedChild>
                      <HoverScale scale={1.05}>
                        <div>
                          <p className="text-2xl sm:text-3xl font-bold text-blue-400">2021</p>
                          <p className="text-sm sm:text-base text-gray-500">Olympics</p>
                        </div>
                      </HoverScale>
                    </AnimatedChild>
                  </div>
                </StaggerContainer>
              </div>
            </SlideUp>

            {/* Main Chat Experience */}
            <div className="w-full">
              <HomeChat />
            </div>

            {/* CTA Buttons */}
            <SlideUp>
              <div className="text-center space-y-4">
                <p className="text-gray-400">Or explore directly:</p>
                <StaggerContainer delay={0.1}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedChild>
                      <Link href="/projects">
                        <HoverScale scale={1.05}>
                          <Button size="lg">View My Work</Button>
                        </HoverScale>
                      </Link>
                    </AnimatedChild>
                    <AnimatedChild>
                      <Link href="/about">
                        <HoverScale scale={1.05}>
                          <Button variant="outline" size="lg">Learn My Story</Button>
                        </HoverScale>
                      </Link>
                    </AnimatedChild>
                  </div>
                </StaggerContainer>
              </div>
            </SlideUp>
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
