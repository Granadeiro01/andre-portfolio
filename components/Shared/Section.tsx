import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "transparent" | "gradient" | "dark";
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      maxWidth = "xl",
      padding = "lg",
      background = "transparent",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: "",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16",
      lg: "py-16 sm:py-24",
      xl: "py-20 sm:py-32",
    };

    const backgroundClasses = {
      transparent: "bg-transparent",
      gradient: "bg-gradient-to-b from-dark-900 to-dark-800",
      dark: "bg-dark-800/50",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          backgroundClasses[background],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        <Container maxWidth={maxWidth}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = "Section";
