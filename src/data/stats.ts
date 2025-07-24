import { Stat } from "@/types";

export const statsData: Stat[] = [
  {
    id: "active-users",
    value: 15000,
    label: "활성 사용자",
    suffix: "+",
    icon: "Users",
  },
  {
    id: "ai-models",
    value: 50,
    label: "AI 모델 지원",
    suffix: "+",
    icon: "Brain",
  },
  {
    id: "success-rate",
    value: 99,
    label: "성공률",
    suffix: "%",
    icon: "TrendingUp",
  },
  {
    id: "requests-processed",
    value: 2500000,
    label: "처리된 요청",
    suffix: "+",
    icon: "Zap",
  },
];
