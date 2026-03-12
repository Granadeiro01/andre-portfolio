"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Shared/Container";
import { Button } from "@/components/Shared/Button";
import { navigationStructure } from "@/lib/navigation";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-dark-900/80 border-b border-gray-800/50">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
              AG
            </div>
            <span className="hidden sm:inline font-bold text-white">Andre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationStructure.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/contact" className="hidden sm:inline-block">
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800/50">
            {navigationStructure.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="block px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
};
