"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: "홈", href: "#home" },
  { name: "기능", href: "#features" },
  { name: "통계", href: "#stats" },
  { name: "후기", href: "#testimonials" },
  { name: "연락처", href: "#contact" },
];

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-2xl font-bold"
              onClick={closeMenu}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <span className="text-sm font-bold">T</span>
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TapTik
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              로그인
            </Button>
            <Button size="sm">시작하기</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="메뉴 열기"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button variant="outline" size="sm" onClick={closeMenu}>
                  로그인
                </Button>
                <Button size="sm" onClick={closeMenu}>
                  시작하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
