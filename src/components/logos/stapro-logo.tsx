import Image from "next/image";
import { cn } from "@/lib/utils";

interface StaproLogoProps {
  className?: string;
}

export default function StaproLogo({ className }: StaproLogoProps) {
  return (
    <Image
      src="https://utfs.io/f/c7c86d08-543f-47b5-bdb2-a7a1e426f825-t3fptr.dev.png"
      alt="Stapro Logo"
      width={240}
      height={80}
      className={cn("object-contain", className)}
      priority
    />
  );
}
