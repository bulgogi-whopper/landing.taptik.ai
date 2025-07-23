import Link from "next/link";
import { Mail, Phone, Github, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  className?: string;
}

const footerLinks = {
  product: [
    { name: "기능", href: "#features" },
    { name: "가격", href: "#pricing" },
    { name: "API", href: "#api" },
    { name: "문서", href: "#docs" },
  ],
  company: [
    { name: "소개", href: "#about" },
    { name: "블로그", href: "#blog" },
    { name: "채용", href: "#careers" },
    { name: "연락처", href: "#contact" },
  ],
  support: [
    { name: "도움말", href: "#help" },
    { name: "FAQ", href: "#faq" },
    { name: "커뮤니티", href: "#community" },
    { name: "상태", href: "#status" },
  ],
  legal: [
    { name: "개인정보처리방침", href: "#privacy" },
    { name: "이용약관", href: "#terms" },
    { name: "쿠키 정책", href: "#cookies" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/taptik",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/taptik",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/taptik",
    icon: Linkedin,
  },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-background border-t ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <span className="text-sm font-bold">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TapTik
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                AI를 모든 사람에게. 복잡한 AI 기술을 쉽고 직관적으로 사용할 수
                있도록 돕는 혁신적인 플랫폼입니다.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>contact@taptik.ai</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+82-2-1234-5678</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">제품</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">회사</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">법적 고지</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TapTik. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ in Korea</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
