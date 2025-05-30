import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import SsrThemeImage from "@/components/Ssr-Theme-image";

const MobileSearchBar = dynamic(() => import("./MobileSearchBar"), { ssr: true });
export default function MobileSerchDrawer() {
  return (
    <Drawer>
      <DrawerTrigger className="block lg:hidden relative flex-1 w-full text-sm md:text-md">
        <MobileSearchBar />
      </DrawerTrigger>
      <DrawerContent className="top-0 left-0 right-0 h-screen mt-0 rounded-b-xl">
        <DrawerHeader>
          <div className="flex items-center justify-between mt-3 my-5">
            <div className="flex items-center gap-x-2 text-sm">
              در {<SsrThemeImage w={50} h={50} className="mt-[-3px]" />} جستوجو
              کنید.{" "}
            </div>
            <DrawerClose asChild className="cursor-pointer">
              <X size={19} />
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* drawer content */}
        <div className="px-4 pb-4">
          {" "}
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            nobis tempora, consectetur minima esse dolore deserunt
            reprehenderit, vitae deleniti quod necessitatibus. Dignissimos
            voluptates saepe facilis, repellat laborum reprehenderit cum
            reiciendis.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
