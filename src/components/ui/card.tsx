import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "hover:shadow-lg hover:-translate-y-1",
        feature:
          "relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 border-gradient hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] group",
        stats:
          "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        testimonial:
          "bg-gradient-to-br from-background to-accent/10 hover:shadow-lg hover:-translate-y-1 hover:rotate-1 transition-transform",
        contact:
          "bg-gradient-to-br from-background via-background to-primary/5 border-primary/20 hover:shadow-xl hover:-translate-y-1",
        interactive:
          "cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transform-gpu",
      },
      size: {
        default: "py-6",
        sm: "py-4",
        lg: "py-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, size, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
