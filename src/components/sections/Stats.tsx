"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Users, Brain, TrendingUp, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Stat, StatsProps } from "@/types";

// Icon mapping
const iconMap = {
  Users,
  Brain,
  TrendingUp,
  Zap,
};

// Individual Stat Card Component
interface StatCardProps {
  stat: Stat;
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();
  const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

  // Format number with commas for better readability
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Counter animation effect
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds animation
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        const currentCount = Math.floor(stat.value * easedProgress);
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(stat.value); // 확실히 최종값으로 설정
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, stat.value, hasAnimated]);

  // Card hover animation
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: "easeOut",
        },
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className="group"
    >
      <Card
        variant="stats"
        className="h-full p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-background dark:bg-gray-900 border border-border dark:border-gray-700 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] transition-all duration-500 ease-out group"
      >
        {/* Background effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 text-center">
          {/* Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 dark:bg-blue-500/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-300">
            {IconComponent && (
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-primary/80 transition-colors duration-300 dark:text-blue-400" />
            )}
          </div>

          {/* Count Display */}
          <CardHeader className="p-0 space-y-1 sm:space-y-2">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold text-foreground dark:text-white group-hover:scale-105 transition-transform duration-300 break-words">
              {formatNumber(count)}
              {stat.suffix}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground dark:text-gray-300 group-hover:text-foreground transition-colors duration-300">
              {stat.label}
            </CardDescription>
          </CardHeader>
        </div>

        {/* Subtle animated border */}
        <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
}

// Main Stats Section Component
export default function Stats({ stats }: StatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px", // 모바일에서 바로 트리거되도록 여백 제거
    amount: 0.05, // 섹션이 조금만 보여도 트리거되도록 더 낮춤
  });

  return (
    <section
      ref={ref}
      id="stats"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground dark:text-white">
            숫자로 보는 TapTik의 성과
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            전 세계 개발자들이 TapTik과 함께 더 효율적인 개발 환경을 만들어가고
            있습니다. 실시간으로 업데이트되는 성과 지표를 확인해보세요.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
            매분마다 새로운 개발자들이 TapTik을 선택하고 있습니다
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              지금 시작하기
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
