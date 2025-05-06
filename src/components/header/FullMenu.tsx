"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import BaseMenu from "./BaseMenu";
// import MobileMenu from "./mobile/MobileMenu";

// const BaseMenu = dynamic(() => import("./BaseMenu"), { ssr: false });
const MobileMenu = dynamic(() => import("./mobile/MobileMenu"), { ssr: false });

export default function FullMenu() {
  const [scrollingStatus, setScrollingStatus] = useState<
    "up" | "down" | "default"
  >("default");
  const [mounted, setMounted] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    lastScrollRef.current = window.scrollY;
  }, []);

  const handleScroll = useCallback(() => {
    if (!mounted) return;

    const currentScroll = window.scrollY;
    if (currentScroll === 0) {
      setScrollingStatus("default");
    } else {
      const direction = currentScroll > lastScrollRef.current ? "down" : "up";
      setScrollingStatus((prev) => (prev === direction ? prev : direction));
    }
    lastScrollRef.current = currentScroll;
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted, handleScroll]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-20 transition-transform duration-300 ${
          scrollingStatus !== "down" ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <BaseMenu />
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
