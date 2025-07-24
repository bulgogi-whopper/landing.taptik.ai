"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Testimonial, TestimonialsProps } from "@/types";

// Star Rating Component
interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating}/{maxRating}
      </span>
    </div>
  );
}

// Individual Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <Card
        variant="testimonial"
        className="h-full p-8 relative overflow-hidden bg-gradient-to-br from-background to-accent/10 dark:from-gray-900 dark:to-blue-950/20 border-gradient hover:shadow-xl transition-all duration-500 group"
      >
        {/* Quote icon background */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <Quote className="w-16 h-16 text-primary" />
        </div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative z-10 p-0">
          {/* Rating */}
          <div className="mb-6">
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Testimonial Content */}
          <blockquote className="text-foreground leading-relaxed mb-6 text-lg dark:text-gray-200">
            "{testimonial.content}"
          </blockquote>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover"
                                         onError={(e) => {
                       // Fallback to initials if image fails to load
                       e.currentTarget.style.display = 'none';
                       (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                     }}
                  />
                ) : null}
                <div
                  className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg"
                  style={{ display: testimonial.avatar ? 'none' : 'flex' }}
                >
                  {testimonial.name.charAt(0)}
                </div>
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Name and Role */}
            <div>
              <CardTitle className="text-lg font-semibold text-foreground dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                {testimonial.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground dark:text-gray-400 font-medium">
                {testimonial.role}
              </CardDescription>
              <CardDescription className="text-sm text-muted-foreground/80 dark:text-gray-500">
                {testimonial.company}
              </CardDescription>
            </div>
          </div>
        </CardContent>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />
      </Card>
    </motion.div>
  );
}

// Navigation Dots Component
interface NavigationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

function NavigationDots({ total, current, onChange }: NavigationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === current
              ? "bg-primary scale-125 shadow-lg"
              : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/60 hover:scale-110"
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
}

// Main Testimonials Section Component
export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlaying, isInView]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 via-background to-accent/5 dark:bg-gradient-to-b dark:from-purple-950/20 dark:via-gray-950 dark:to-black"
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
            개발자들의 진솔한 후기
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            전 세계 개발자들이 TapTik과 함께 어떻게 개발 생산성을 혁신했는지 들어보세요.
            실제 사용 경험을 바탕으로 한 솔직한 평가입니다.
          </p>
        </motion.div>

        {/* Testimonial Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {/* Navigation Arrows - 카드에만 상대적으로 위치 */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-background/80 dark:bg-gray-800/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-background/80 dark:bg-gray-800/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NavigationDots
              total={testimonials.length}
              current={currentIndex}
              onChange={goToSlide}
            />
          </motion.div>
        </div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {isAutoPlaying ? "자동 재생 중" : "수동 탐색 모드"} • {testimonials.length}개의 후기
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
            당신도 TapTik과 함께 개발 경험을 혁신해보세요
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              무료로 시작하기
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 