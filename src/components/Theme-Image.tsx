"use client";

import { useTheme } from "next-themes";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ThemeImageProps extends Omit<ImageProps, "src" | "alt"> {
  w: number;
  h: number;
  className?: string;
}

export default function ThemeImage({ w, h, className, ...rest }: ThemeImageProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const imageSrc = theme === "dark" ? "/images/dark-logo.webp" : "/images/light-logo.webp";

  return (
    <Image
      src={imageSrc}
      alt="logo"
      width={w}
      height={h}
      className={className}
      {...rest}
      loading="eager"
      priority 
      fetchPriority="high"
    />
  );
}
