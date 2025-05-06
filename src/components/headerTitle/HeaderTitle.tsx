import { danaBold } from "@/app/styles/fonts";
import { ReactNode, ElementType } from "react";

interface HeaderTileProps {
  children: ReactNode;
  as?: ElementType; // مشخص‌کننده‌ی نوع تگ مثل h1, h2, p
  className?: string;
}

export default function HeaderTitle({
  children,
  as: Tag = "p", // پیش‌فرض اگه چیزی نفرستی p باشه
  className = "",
}: HeaderTileProps) {
  return (
    <Tag
      className={`${danaBold.className} relative text-md md:text-lg font-bold inline-block after:content-[''] after:block after:h-[1.5px] after:rounded-full after:w-full after:bg-gradient-to-r after:from-customgreen  after:to-background after:mt-0 ${className}`}
    >
      {children}
    </Tag>
  );
}
