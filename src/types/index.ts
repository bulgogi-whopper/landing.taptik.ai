import { LucideIcon } from "lucide-react";

// Hero Section Types
export interface HeroProps {
  title: string;
  subtitle: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

// Features Section Types
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface FeaturesProps {
  features: Feature[];
}

// Statistics Section Types
export interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  icon: LucideIcon;
}

export interface StatsProps {
  stats: Stat[];
}

// Testimonials Section Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

// Contact Section Types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactProps {
  onSubmit: (data: ContactForm) => Promise<void>;
}

// Theme Configuration Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  gradients: {
    hero: string;
    features: string;
    stats: string;
  };
}

// Page Content Types
export interface LandingPageContent {
  hero: HeroProps;
  features: Feature[];
  stats: Stat[];
  testimonials: Testimonial[];
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
  };
}

// Component Props Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface CardProps {
  variant?: "default" | "feature" | "testimonial" | "stat";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing: string;
}

// Form Validation Types
export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface FormState {
  values: ContactForm;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}
