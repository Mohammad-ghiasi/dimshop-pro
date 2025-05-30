import { cookies } from "next/headers";
import Image, { ImageProps } from "next/image";

interface ThemeImageProps extends Omit<ImageProps, "src" | "alt"> {
  w: number;
  h: number;
  className?: string;
}

export default function SsrThemeImage({
  w,
  h,
  className,
  ...rest
}: ThemeImageProps) {
  const theme = cookies().get("theme")?.value;

  const imageSrc =
    theme === "dark" ? "/images/dark-logo.webp" : "/images/light-logo.webp";

  return (
    <Image
      src={imageSrc}
      alt="Dimshop logo"
      width={w}
      height={h}
      className={className}
      {...rest}
      loading="eager"
      priority
    />
  );
}
