import { Hero } from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import { featuresData } from "@/data/features";

const heroData = {
  title: "딸깍 한 번으로 완성되는 개발 환경",
  subtitle:
    "복잡한 IDE 마이그레이션을 쉽고 직관적으로 해결하세요. TapTik과 함께 개발 환경 설정의 무한한 가능성을 탐험하고, 팀 협업의 효율성을 경험해보세요.",
  primaryCTA: {
    text: "시작하기",
    href: "#features",
  },
  secondaryCTA: {
    text: "더 알아보기",
    href: "#about",
  },
};

export default function Home() {
  return (
    <main>
      <Hero {...heroData} />
      <Features features={featuresData} />
    </main>
  );
}
