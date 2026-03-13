"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Staggered container for animating children sequentially
 */
export const StaggerContainer = ({
  children,
  delay = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated child element within a stagger container
 */
export const AnimatedChild = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Fade-in animation
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide up animation
 */
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide from left
 */
export const SlideLeft = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide from right
 */
export const SlideRight = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Hover scale effect
 */
export const HoverScale = ({
  children,
  scale = 1.05,
  className = "",
}: {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Floating animation
 */
export const Float = ({
  children,
  delay = 0,
  duration = 3,
  offset = 10,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -offset, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Pulse animation
 */
export const Pulse = ({
  children,
  delay = 0,
  duration = 2,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        opacity: [1, 0.5, 1],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Rotate animation
 */
export const Rotate = ({
  children,
  delay = 0,
  duration = 4,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Gradient animation (text or background)
 */
export const AnimatedGradient = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%]`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Tap animation (button-like)
 */
export const TapScale = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Parallax scroll effect (requires scroll context)
 */
export const Parallax = ({
  children,
  offset = 50,
  className = "",
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: offset }}
      viewport={{ once: false }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};
