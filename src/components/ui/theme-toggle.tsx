"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative", className)}
        disabled
        aria-label="Toggle theme"
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:bg-accent/50",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative size-4">
        <Sun
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 rotate-0 scale-100",
            isDark && "rotate-90 scale-0",
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 rotate-90 scale-0",
            isDark && "rotate-0 scale-100",
          )}
        />
      </div>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </Button>
  );
}
