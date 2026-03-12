import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    const variants = {
      default:
        "bg-gray-700/50 text-gray-200 border border-gray-600/50",
      primary:
        "bg-blue-500/10 text-blue-300 border border-blue-500/30",
      success:
        "bg-green-500/10 text-green-300 border border-green-500/30",
      warning:
        "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
      error:
        "bg-red-500/10 text-red-300 border border-red-500/30",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs font-medium rounded",
      md: "px-3 py-1.5 text-sm font-medium rounded-md",
      lg: "px-4 py-2 text-base font-medium rounded-lg",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-block whitespace-nowrap transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
