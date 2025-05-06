"use client"
import { House, MessageCircle, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // اگر از clsx یا class-variance-authority استفاده می‌کنید

export default function MobileMenu() {
  const pathname = usePathname();

  // لیست روت‌ها و آیکون‌های مربوطه
  const links = [
    { href: "/ticket", icon: <MessageCircle />, name: "tiket" },
    { href: "/", icon: <House />, name: "home" },
    { href: "/chart", icon: <ShoppingCart />, name: "chart" },
    { href: "/userpanel", icon: <UserRound />, name: "userpanel" },
  ];

  return (
    <div className="w-full bg-background flex items-center justify-center border-t md:hidden ">
      <div className="flex flex-row justify-between items-center w-full px-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "p-2 transition-all",
              pathname === link.href
                ? "text-customgreen scale-110 font-bold" // استایل فعال
                : "text-muted-foreground" // استایل معمولی
            )}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}