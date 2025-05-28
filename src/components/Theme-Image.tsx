"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";

interface ThemeImageProps extends Omit<ImageProps, "src" | "alt"> {
  w: number;
  h: number;
  className?: string;
}

export default function ThemeImage({ w, h, className, ...rest }: ThemeImageProps) {
  const { theme } = useTheme();

  const imageSrc = theme === "dark" ? "/images/dark-logo.webp" : "/images/light-logo.webp";

  return (
    <Image
      src="/images/dark-logo.webp"
      alt="logo"
      width={w}
      height={h}
      className={className}
      {...rest}
      priority
    />
  );
}
