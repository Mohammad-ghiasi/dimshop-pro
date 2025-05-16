"use client";

import { ReactNode } from "react";

export default function ScrollNav({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        const container = document.getElementById("scroll-container");
        const target = document.getElementById(to);
        if (container && target) {
          container.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        }
      }}
    >
      {children}
    </a>
  );
}
