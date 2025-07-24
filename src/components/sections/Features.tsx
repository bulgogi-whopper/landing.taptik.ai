"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Eye,
  Database,
  Zap,
  Languages,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Feature, FeaturesProps } from "@/types";

// Icon mapping
const iconMap = {
  PenTool,
  Eye,
  Database,
  Zap,
  Languages,
  TrendingUp,
};

// Individual Feature Card Component
interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <Card
        variant="feature"
        className="h-full p-5 sm:p-6 relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 dark:from-gray-900 dark:via-gray-900 dark:to-black border-gradient hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out group"
      >
        {/* Background gradient effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
          }}
        />

        {/* Icon container with color theming */}
        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${feature.color}15`,
              border: `1px solid ${feature.color}30`,
            }}
          >
            <IconComponent
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110 dark:opacity-90"
              style={{ color: feature.color }}
            />
          </div>

          <CardHeader className="p-0 space-y-2">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 dark:text-gray-100">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground leading-relaxed dark:text-gray-300">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </div>

        {/* Subtle hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}

// Main Features Section Component
export default function Features({ features }: FeaturesProps) {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground dark:text-white">
            딸깍 한 번으로 완성되는 개발 환경
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            TapTik과 함께 IDE 마이그레이션과 개발 환경 설정을 자동화하세요.
            복잡한 설정을 간단하게, 팀 협업을 더욱 효율적으로 만들어드립니다.
          </p>
        </motion.div>

        {/* Features Grid - 3x2 desktop layout, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
            더 많은 개발 도구 기능들이 여러분을 기다리고 있습니다
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            TapTik 시작하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
