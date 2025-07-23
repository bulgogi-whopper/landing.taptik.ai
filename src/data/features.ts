import { Feature } from "@/types";

export const featuresData: Feature[] = [
  {
    id: "ide-migration",
    title: "IDE 마이그레이션",
    description:
      "VSCode ↔ Kiro ↔ Windsurf ↔ Cursor 간 설정을 딸깍 한 번에 자동 마이그레이션. 확장 프로그램, 키바인딩, 워크스페이스 설정까지 완벽 이관.",
    icon: "Zap",
    color: "#3B82F6", // Blue
  },
  {
    id: "ai-context-sync",
    title: "AI 컨텍스트 동기화",
    description:
      "LLM 간 개발자 프로필과 컨텍스트를 자동 공유. Kiro .md 파일을 Cursor 호환 형식으로 변환하고 Model Context Protocol 기반으로 표준화.",
    icon: "Database",
    color: "#8B5CF6", // Purple
  },
  {
    id: "dev-marketplace",
    title: "개발 설정 마켓플레이스",
    description:
      "Kiro Spec, Hook, Steering 설정 템플릿을 공유하고 관리. 팀별/프로젝트별 설정 패키지를 자동 동기화하고 버전 관리까지.",
    icon: "TrendingUp",
    color: "#10B981", // Green
  },
  {
    id: "environment-switching",
    title: "환경 전환 관리",
    description:
      "Git branch 스타일의 개발 환경 전환. 프로젝트별 컨텍스트 격리와 빠른 스위칭으로 설정 백업 및 복원을 자동화.",
    icon: "Eye",
    color: "#F59E0B", // Amber
  },
  {
    id: "one-click-setup",
    title: "원클릭 환경 설정",
    description:
      "신입 개발자도 팀의 표준 개발 환경을 딸깍 한 번에 설정. NPX 패키지 통합으로 템플릿 기반 즉시 환경 구축.",
    icon: "PenTool",
    color: "#EF4444", // Red
  },
  {
    id: "cross-platform-sync",
    title: "크로스 플랫폼 동기화",
    description:
      "Electron 기반 데스크톱 앱으로 모든 운영체제 지원. GitHub Gist 연동과 실시간 설정 동기화로 어디서든 일관된 개발 환경.",
    icon: "Languages",
    color: "#06B6D4", // Cyan
  },
];
