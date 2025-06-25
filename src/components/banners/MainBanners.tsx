"use client"
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
export default function MainBanners() {
  return (
    <>
      <div>banners</div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
             stopOnInteraction: false,
          }),
        ]}
        className="w-[100vw]   bg-orange-400"
        dir="ltr"
      >
        <CarouselContent>
          <CarouselItem className="h-[400px]">
            <div className="p-1">
              <span className="text-4xl font-semibold">1</span>
            </div>
          </CarouselItem>
          <CarouselItem className="bg-blue-300 h-[400px]">
            <div className="p-1">
              <span className="text-4xl font-semibold">2</span>
            </div>
          </CarouselItem>
          <CarouselItem className="h-[400px]">
            <div className="p-1">
              <span className="text-4xl font-semibold">3</span>
            </div>
          </CarouselItem>
          <CarouselItem className="bg-blue-300 h-[400px]">
            <div className="p-1">
              <span className="text-4xl font-semibold">4</span>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
