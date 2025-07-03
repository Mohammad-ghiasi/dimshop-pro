"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";

export default function TickAnimation() {
  const playerRef = useRef<Player | null>(null);

  return (
    <Player
      ref={playerRef}
      autoplay
      loop={false}
      keepLastFrame
      src="/lottie/tick.json"
      className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
      onEvent={(event) => {
        if (event === "complete") {
          playerRef.current?.pause(); // استپ روی آخرین فریم
        }
      }}
    />
  );
}
