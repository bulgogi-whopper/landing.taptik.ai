"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Zap,
  Cpu,
  Bot,
  Lightbulb,
  ArrowRight,
  Play,
  Rocket,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroProps } from "@/types";
import { useRef, useMemo, useCallback } from "react";

// 최적화된 아이콘 배열 (21개 → 8개로 축소)
const floatingIcons = [
  { Icon: Brain, delay: 0, x: -25, y: -35, duration: 4.5 },
  { Icon: Sparkles, delay: 0.4, x: 35, y: -25, duration: 4.0 },
  { Icon: Zap, delay: 0.8, x: -40, y: 25, duration: 4.8 },
  { Icon: Cpu, delay: 1.2, x: 40, y: 35, duration: 4.2 },
  { Icon: Bot, delay: 1.6, x: -30, y: 45, duration: 4.6 },
  { Icon: Lightbulb, delay: 2.0, x: 25, y: -45, duration: 4.1 },
  { Icon: Rocket, delay: 2.4, x: -45, y: -15, duration: 4.7 },
  { Icon: Target, delay: 2.8, x: 45, y: -30, duration: 4.3 },
];

// 색상 팔레트 최적화
const colorPalette = [
  'text-blue-400/50', 'text-purple-400/50', 'text-cyan-400/50', 
  'text-emerald-400/50', 'text-yellow-400/50', 'text-pink-400/50',
  'text-indigo-400/50', 'text-orange-400/50'
];

export function Hero({ title, subtitle, primaryCTA, secondaryCTA }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 성능 최적화된 spring 설정
  const springConfig = useMemo(() => ({
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  }), []);

  // 향상된 패럴랙스 효과 - Hook 규칙 준수
  const iconsY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
    springConfig
  );

  const titleY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "25%"]),
    springConfig
  );

  const subtitleY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "35%"]),
    springConfig
  );

  const buttonsY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
    springConfig
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [1, 0.88]), 
    springConfig
  );

  // 부드러운 fade-out 효과
  const contentOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.85, 0]),
    { stiffness: 80, damping: 20 }
  );

  // 배경 블러 효과 (성능 최적화)
  const contentBlur = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.3, 1.5]);

  // 버튼 클릭 핸들러 메모이제이션
  const handlePrimaryClick = useCallback(() => {
    // Analytics tracking can be added here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Primary Button',
      });
    }
  }, []);

  const handleSecondaryClick = useCallback(() => {
    // Analytics tracking can be added here
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Secondary Button',
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
      role="banner"
    >
      {/* 향상된 배경 그라디언트 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
        aria-hidden="true"
      />
      
      {/* 텍스트 가독성을 위한 오버레이 강화 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/10 to-emerald-950/15"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
        }}
        aria-hidden="true"
      />

      {/* 최적화된 Floating AI Icons */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: shouldReduceMotion ? 0 : iconsY }}
        aria-hidden="true"
      >
        {floatingIcons.map(({ Icon, delay, x, y, duration }, index) => {
          const baseLeft = 15 + (index * 10) % 70;
          const baseTop = 20 + (index * 8) % 60;
          const iconSizeClass = index % 2 === 0 ? 'w-8 h-8' : 'w-7 h-7';
          const opacity = 0.5 + (index % 2) * 0.1;
          const colorClass = colorPalette[index % colorPalette.length];
          const hoverColorClass = colorClass.replace('/50', '/80');

          return (
            <motion.div
              key={`floating-icon-${index}`}
              className="absolute"
              style={{
                left: `${baseLeft}%`,
                top: `${baseTop}%`,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0.3, 
                rotate: -90,
                x: x * 1.5,
                y: y * 1.5,
              }}
              animate={{
                opacity: opacity,
                scale: 1,
                rotate: 0,
                x: shouldReduceMotion ? 0 : [0, x, x * 0.7, x * 1.1, 0],
                y: shouldReduceMotion ? 0 : [0, y * 0.8, y * 1.2, y * 0.9, 0],
              }}
              transition={{
                opacity: { delay, duration: 1.5, ease: "easeOut" },
                scale: { 
                  delay, 
                  duration: 1.2, 
                  ease: "backOut",
                  type: "spring",
                  stiffness: 120
                },
                rotate: { 
                  delay, 
                  duration: 1.8, 
                  ease: "easeOut" 
                },
                x: shouldReduceMotion ? {} : {
                  delay: delay + 2,
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                y: shouldReduceMotion ? {} : {
                  delay: delay + 2,
                  duration: duration + 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.2,
                rotate: 15,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                animate={shouldReduceMotion ? {} : {
                  rotate: [0, 360],
                }}
                transition={shouldReduceMotion ? {} : {
                  duration: 25 + index * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Icon 
                  className={`${iconSizeClass} ${colorClass} drop-shadow-lg hover:${hoverColorClass} transition-colors duration-300 filter hover:drop-shadow-xl`}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 텍스트 가독성 향상을 위한 메인 콘텐츠 배경 */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
        }}
        aria-hidden="true"
      />

      {/* 메인 콘텐츠 with 향상된 애니메이션 */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          scale: scale,
          opacity: contentOpacity,
          filter: `blur(${contentBlur}px)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 향상된 메인 타이틀 */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.2,
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
            style={{
              y: shouldReduceMotion ? 0 : titleY,
            }}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-300 via-white to-emerald-300 bg-clip-text text-transparent"
              initial={{
                backgroundPosition: "0% 50%",
                backgroundSize: "300% 300%",
              }}
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={shouldReduceMotion ? {} : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "300% 300%",
                textShadow: "0 0 60px rgba(59, 130, 246, 0.5), 0 0 120px rgba(16, 185, 129, 0.3)",
                filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))"
              }}
            >
              {title}
            </motion.span>
          </motion.h1>

          {/* 향상된 서브타이틀 */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.4,
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              y: shouldReduceMotion ? 0 : subtitleY,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.7)"
            }}
          >
            {subtitle}
          </motion.p>

          {/* 향상된 CTA 버튼 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center max-w-md mx-auto sm:max-w-none"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.6,
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              y: shouldReduceMotion ? 0 : buttonsY,
            }}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                href={primaryCTA.href}
                onClick={handlePrimaryClick}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 min-w-[200px]"
                aria-label={`${primaryCTA.text} - 기본 액션`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {primaryCTA.text}
                  <ArrowRight 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  aria-hidden="true"
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={shouldReduceMotion ? {} : {
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                href={secondaryCTA.href}
                onClick={handleSecondaryClick}
                className="group border-2 border-gray-200/30 hover:border-blue-300 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 backdrop-blur-md text-gray-100 hover:text-white shadow-xl hover:shadow-blue-500/20 min-w-[200px] bg-white/5"
                aria-label={`${secondaryCTA.text} - 보조 액션`}
              >
                <span className="flex items-center gap-3">
                  <Play 
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                  {secondaryCTA.text}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 향상된 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 1.0,
          ease: "easeOut",
        }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
        }}
        role="button"
        tabIndex={0}
        aria-label="아래로 스크롤하여 더 많은 콘텐츠 보기"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-300/60 rounded-full flex items-start justify-center pt-2 backdrop-blur-sm bg-white/5 cursor-pointer"
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={shouldReduceMotion ? {} : {
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={shouldReduceMotion ? {} : {
            scale: 1.1,
            borderColor: "rgb(59, 130, 246)",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
            animate={shouldReduceMotion ? {} : {
              scaleY: [1, 0.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={shouldReduceMotion ? {} : {
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          className="text-xs text-gray-400 mt-2 font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
}
