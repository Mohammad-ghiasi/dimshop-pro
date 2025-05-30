"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import dynamic from "next/dynamic";


const MobileMenu = dynamic(() => import("./mobile/MobileMenu"), { ssr: false });

export default function FullMenu({ children }: { children: React.ReactNode }) {
  const [scrollingStatus, setScrollingStatus] = useState<
    "up" | "down" | "default"
  >("default");
  const lastScrollRef = useRef(0);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;
  }, []);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    if (currentScroll === 0) {
      setScrollingStatus("default");
    } else {
      const direction = currentScroll > lastScrollRef.current ? "down" : "up";
      setScrollingStatus((prev) => (prev === direction ? prev : direction));
    }
    lastScrollRef.current = currentScroll;
  }, []);

  useEffect(() => {

    const debouncedScroll = debounce(handleScroll, 300, {
      leading: true,
      trailing: true,
      maxWait: 300,
    });

    window.addEventListener("scroll", debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      debouncedScroll.cancel();
    };
  }, [, handleScroll]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-20 transition-transform duration-300 ${
          scrollingStatus !== "down" ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {children}
      </div>
      <div
        className={`fixed bottom-0 left-0 w-full z-20 transition-transform duration-300 ${
          scrollingStatus === "default" || scrollingStatus === "down"
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >
        <MobileMenu />
      </div>
    </>
  );
}
