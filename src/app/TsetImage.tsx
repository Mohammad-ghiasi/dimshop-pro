"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function TsetImage() {
  const { theme } = useTheme();
  return theme === "dark" ? (
    <Image alt="logo" src="/images/png.png" width={600} height={200} />
  ) : (
    <Image alt="logo" src="/images/img.png" width={600} height={200} />
  );
}

{
  /* <Image alt="logo" src="/images/png.png" width={600} height={200} /> */
}

{
  /* <Image alt="logo" src="/images/img.png" width={600} height={200} /> */
}
