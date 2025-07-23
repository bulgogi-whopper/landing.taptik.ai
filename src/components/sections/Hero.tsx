"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Brain,
  Sparkles,
  Zap,
  Cpu,
  Bot,
  Lightbulb,
  ArrowRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroProps } from "@/types";
import { useRef } from "react";

const floatingIcons = [
  { Icon: Brain, delay: 0, x: -20, y: -30 },
  { Icon: Sparkles, delay: 0.5, x: 30, y: -20 },
  { Icon: Zap, delay: 1, x: -40, y: 20 },
  { Icon: Cpu, delay: 1.5, x: 40, y: 30 },
  { Icon: Bot, delay: 2, x: -30, y: 40 },
  { Icon: Lightbulb, delay: 2.5, x: 20, y: -40 },
];

export function Hero({ title, subtitle, primaryCTA, secondaryCTA }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax effects with spring physics for smoother animations

  const iconsY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
    {
      stiffness: 120,
      damping: 25,
      restDelta: 0.001,
    },
  );

  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
    {
      stiffness: 150,
      damping: 30,
      restDelta: 0.001,
    },
  );

  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
    {
      stiffness: 140,
      damping: 28,
      restDelta: 0.001,
    },
  );

  const buttonsY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "45%"]),
    {
      stiffness: 130,
      damping: 26,
      restDelta: 0.001,
    },
  );

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0.85]), {
    stiffness: 120,
    damping: 25,
  });

  // Individual fade-in animations for text elements with staggered timing
  const titleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.9, 0]),
    {
      stiffness: 110,
      damping: 28,
    },
  );

  const subtitleOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0]),
    {
      stiffness: 105,
      damping: 26,
    },
  );

  const buttonsOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.7, 0]),
    {
      stiffness: 100,
      damping: 24,
    },
  );

  // Smooth scroll transition effects - reduced blur for better readability
  const contentBlur = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 0.5, 2]);
  const contentRotateX = useTransform(scrollYProgress, [0, 0.5], [0, -3]);

  // Background blur effect for depth (removed for smoother performance)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fixed background with smooth gradient - Dark mode only */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

      {/* Subtle overlay that fades on scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-green-900/10"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
        }}
      />

      {/* Floating AI Icons with enhanced parallax and individual animations */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: iconsY }}
      >
        {floatingIcons.map(({ Icon, delay, x, y }, index) => {
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 0.6,
                scale: 1,
                rotate: 0,
                x: [0, x, 0],
                y: [0, y, 0],
              }}
              transition={{
                opacity: { delay, duration: 1.2, ease: "easeOut" },
                scale: { delay, duration: 1, ease: "backOut" },
                rotate: { delay, duration: 1.5, ease: "easeOut" },
                x: {
                  delay: delay + 1.5,
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                y: {
                  delay: delay + 1.5,
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <Icon className="w-8 h-8 text-gray-400/30 drop-shadow-lg" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content with enhanced scroll-based animations and smooth transitions */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          scale,
          filter: `blur(${contentBlur}px)`,
          rotateX: contentRotateX,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Title with enhanced fade-in and parallax animation */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.8,
              filter: "blur(20px)",
              rotateX: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              rotateX: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.2,
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1], // Custom easing for smooth animation
              type: "spring",
              stiffness: 60,
              damping: 20,
            }}
            style={{
              y: titleY,
              opacity: titleOpacity,
              transformPerspective: "1000px",
            }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-400 dark:via-gray-200 dark:to-white bg-clip-text text-transparent"
              initial={{
                backgroundPosition: "0% 50%",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
                textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              {title}
            </motion.span>
          </motion.h1>

          {/* Subtitle with enhanced fade-in animation */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{
              opacity: 0,
              y: 60,
              filter: "blur(15px)",
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.6,
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 80,
              damping: 25,
            }}
            style={{
              y: subtitleY,
              opacity: subtitleOpacity,
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                duration: 2,
                ease: "easeOut",
              }}
            >
              {subtitle}
            </motion.span>
          </motion.p>

          {/* CTA Buttons with staggered fade-in animation */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 1,
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 70,
              damping: 20,
            }}
            style={{
              y: buttonsY,
              opacity: buttonsOpacity,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 1.2,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                href={primaryCTA.href}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 leading-none">
                  <span className="flex items-center">{primaryCTA.text}</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 1.4,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                href={secondaryCTA.href}
                className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2 leading-none">
                  <Play className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="flex items-center">{secondaryCTA.text}</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator with smooth transitions - Fixed to section bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          delay: 2,
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.7, 0]),
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex items-start justify-center pt-2 backdrop-blur-sm bg-white/10 dark:bg-black/10"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
          whileHover={{
            scale: 1.1,
            borderColor: "rgb(59, 130, 246)",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
            animate={{
              scaleY: [1, 0.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          />
        </motion.div>

        {/* Scroll hint text */}
        <motion.p
          className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium tracking-wide text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
}
