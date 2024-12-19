import { cn } from "@/utils/cn";
import React from "react";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn("py-12 transition-colors duration-300", className)}
      {...props}
    />
  );
}

export function FooterContent({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4",
        className
      )}
      {...props}
    />
  );
}

export function FooterColumn({ className, ...props }: FooterProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

export function FooterBottom({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        "mt-12 flex flex-col justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row",
        className
      )}
      {...props}
    />
  );
}
