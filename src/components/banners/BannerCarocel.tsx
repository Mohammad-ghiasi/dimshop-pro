"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Banner, Banners } from "@/types/bannerType";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function BannerCarocel({ banners }: { banners: Banners }) {

  return (
    <div className="h-[200px] md:h-[300px]">
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
        className="w-[100vw] absolute md:static right-0 md:w-full h-full"
        dir="ltr"
      >
        <CarouselContent>
          {banners &&
            banners.map((banner: Banner) => (
              <CarouselItem key={banner.id} className="">
                <div className="relative w- h-[200px] md:h-[300px] bg-red-600">
                  <Image
                    alt="mainbanner"
                    src={banner.bannerImage}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
