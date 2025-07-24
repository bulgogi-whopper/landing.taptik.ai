"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Twitter,
  Linkedin,
  MessageSquare,
  Youtube,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ContactForm, FormState, ContactProps } from "@/types";

// Form validation utility
const validateForm = (values: ContactForm) => {
  const errors: { [key: string]: string } = {};

  // Name validation
  if (!values.name.trim()) {
    errors.name = "이름을 입력해주세요.";
  } else if (values.name.trim().length < 2) {
    errors.name = "이름은 최소 2글자 이상이어야 합니다.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  // Message validation
  if (!values.message.trim()) {
    errors.message = "메시지를 입력해주세요.";
  } else if (values.message.trim().length < 10) {
    errors.message = "메시지는 최소 10글자 이상이어야 합니다.";
  }

  return errors;
};

// Contact Form Component
interface ContactFormComponentProps {
  onSubmit: (data: ContactForm) => Promise<void>;
}

function ContactFormComponent({ onSubmit }: ContactFormComponentProps) {
  const [formState, setFormState] = useState<FormState>({
    values: { name: "", email: "", message: "" },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  });

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      errors: { ...prev.errors, [field]: undefined }, // Clear error on input
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formState.values);

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({ ...prev, errors }));
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        values: { name: "", email: "", message: "" },
        errors: {},
      }));

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSubmitted: false }));
      }, 5000);
    } catch {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: { message: "메시지 전송에 실패했습니다. 다시 시도해주세요." },
      }));
    }
  };

  const { values, errors, isSubmitting, isSubmitted } = formState;

  return (
    <Card variant="contact" className="p-8 bg-background dark:bg-gray-900">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold text-foreground dark:text-gray-100">
          문의하기
        </CardTitle>
        <CardDescription className="text-muted-foreground dark:text-gray-300">
          궁금한 점이나 제안사항이 있으시면 언제든 연락해주세요.
        </CardDescription>
      </CardHeader>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200 font-medium">
            메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.
          </span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground dark:text-gray-200 mb-2"
          >
            이름 *
          </label>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:text-gray-100 ${
              errors.name
                ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950/20"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }`}
            placeholder="홍길동"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              id="name-error"
              className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </motion.div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground dark:text-gray-200 mb-2"
          >
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:text-gray-100 ${
              errors.email
                ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950/20"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }`}
            placeholder="your@email.com"
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              id="email-error"
              className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </motion.div>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground dark:text-gray-200 mb-2"
          >
            메시지 *
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:text-gray-100 resize-vertical ${
              errors.message
                ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950/20"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }`}
            placeholder="TapTik에 대해 궁금한 점이나 제안사항을 자유롭게 남겨주세요..."
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              id="message-error"
              className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 hover:shadow-lg text-white"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              전송 중...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              메시지 보내기
            </>
          )}
        </motion.button>
      </form>
    </Card>
  );
}

// Contact Information Component
function ContactInfo() {
  const contactInfo = [
    {
      icon: Mail,
      label: "이메일",
      value: "hello@taptik.dev",
      link: "mailto:hello@taptik.dev",
    },
    {
      icon: Phone,
      label: "전화번호",
      value: "+82-2-1234-5678",
      link: "tel:+82-2-1234-5678",
    },
    {
      icon: MapPin,
      label: "주소",
      value: "서울특별시 강남구 테헤란로 427, TapTik Tower 15층",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "업무시간",
      value: "월-금 09:00-18:00 (KST)",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/taptik-dev",
      color: "#333",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/taptik_dev",
      color: "#1DA1F2",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/company/taptik",
      color: "#0077B5",
    },
    {
      icon: MessageSquare,
      label: "Discord",
      href: "https://discord.gg/taptik-dev",
      color: "#5865F2",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://youtube.com/@taptik-dev",
      color: "#FF0000",
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-background dark:bg-gray-900">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-xl font-bold text-foreground dark:text-gray-100">
            연락처 정보
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-gray-300">
            다양한 방법으로 저희와 소통하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/10 dark:hover:bg-blue-950/20 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-blue-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground dark:text-gray-200 mb-1">
                  {item.label}
                </p>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground dark:text-gray-400">
                    {item.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="p-6 bg-background dark:bg-gray-900">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-xl font-bold text-foreground dark:text-gray-100">
            소셜 미디어
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-gray-300">
            최신 소식과 업데이트를 확인하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border dark:border-gray-700 hover:border-primary/30 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-200"
              >
                <social.icon
                  className="w-5 h-5"
                  style={{ color: social.color }}
                />
                <span className="text-sm font-medium text-foreground dark:text-gray-200">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Contact Section Component
export default function Contact({ onSubmit }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Default contact form handler
  const defaultHandleSubmit = async (data: ContactForm) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", data);
    // In a real app, this would send the data to your backend
  };

  const handleContactSubmit = onSubmit ?? defaultHandleSubmit;

  return (
    <section
      ref={ref}
      id="contact"
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
            TapTik과 함께 시작하세요
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            개발 환경의 혁신을 경험하고 싶으시다면 언제든 연락주세요. 궁금한
            점이나 제안사항이 있으시면 편하게 문의해주시기 바랍니다.
          </p>
        </motion.div>

        {/* Contact Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Form */}
          <div>
            <ContactFormComponent onSubmit={handleContactSubmit} />
          </div>

          {/* Contact Information */}
          <div>
            <ContactInfo />
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-primary/5 dark:bg-blue-950/20 rounded-2xl border border-primary/10 dark:border-blue-500/20"
        >
          <h3 className="text-2xl font-bold text-foreground dark:text-gray-100 mb-4">
            빠른 응답을 약속드립니다
          </h3>
          <p className="text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            평일 기준 24시간 내에 답변드리며, 긴급한 문의사항의 경우 더욱 빠른
            응답을 위해 전화나 디스코드를 이용해주세요.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
