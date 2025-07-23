import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive leading-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-blue-500/50",
        secondary:
          "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:from-purple-700 hover:to-purple-800 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-purple-500/50",
        outline:
          "border-2 border-blue-600 bg-transparent text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-blue-500/50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transform hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  href?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  href,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  if (href && !asChild) {
    const { href: _, ...linkProps } = props as any;
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-disabled={isDisabled}
        {...linkProps}
      >
        {loading && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}
        {loading ? <span className="sr-only">Loading...</span> : children}
      </Link>
    );
  }

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      )}
      {loading ? <span className="sr-only">Loading...</span> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
