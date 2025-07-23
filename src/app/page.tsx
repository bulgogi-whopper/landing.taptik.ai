import { Hero } from "@/components/sections/Hero";

const heroData = {
  title: "AI를 모든 사람에게",
  subtitle: "복잡한 AI 기술을 쉽고 직관적으로 만나보세요. TapTik과 함께 AI의 무한한 가능성을 탐험하고, 일상에서 AI의 혜택을 경험해보세요.",
  primaryCTA: {
    text: "시작하기",
    href: "#features"
  },
  secondaryCTA: {
    text: "더 알아보기",
    href: "#about"
  }
};

export default function Home() {
  return (
    <main>
      <Hero {...heroData} />
    </main>
  );
}
