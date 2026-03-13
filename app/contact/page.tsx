"use client";

import { Navigation } from "@/components/Navigation";
import { Container } from "@/components/Shared/Container";
import { Section } from "@/components/Shared/Section";
import { Button } from "@/components/Shared/Button";
import { useState } from "react";
import { getQuoteOfTheDay } from "@/data/quotes";
import { SlideUp, FadeIn } from "@/components/Animations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const quote = getQuoteOfTheDay();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the form data to a backend service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <Navigation />
      <Section padding="xl">
        <Container maxWidth="md">
          <SlideUp>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
              <p className="text-gray-400">
                I&apos;m always interested in new opportunities and collaborations
              </p>
            </div>
          </SlideUp>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center mb-8">
              <p className="text-green-300">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 mb-12">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="What&apos;s this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Your message..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          )}

          {/* Quote of the day */}
          <FadeIn>
            <div className="border border-gray-700/50 rounded-lg p-6 bg-gray-800/20">
              <p className="text-gray-400 text-sm mb-2">Quote of the Day</p>
              <p className="text-white italic mb-2">&quot;{quote.text}&quot;</p>
              <p className="text-blue-400 text-sm">— {quote.author}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
