import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import DesktopSearchBar from "./DesktopSearchBar";
// import SerchModalContent from "./SerchModalContent";
import ThemeImage from "@/components/Theme-Image";
import dynamic from "next/dynamic";

const DesktopSearchBar = dynamic(() => import("./DesktopSearchBar"), { ssr: true });
const SerchModalContent = dynamic(() => import("./SerchModalContent"), { ssr: false });

export default function DesktopSearchBarModall() {
  return (
    <Dialog>
      <DialogTrigger className="hidden lg:block relative flex-1 w-full lg:max-w-2xl cursor-pointer text-sm md:text-md">
        <DesktopSearchBar />
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl h-auto">
        <DialogHeader className="mb-5">
          <DialogTitle asChild>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-x-2">
                در {<ThemeImage w={80} h={50} className="mt-[-3px]" />} جستوجو
                کنید.{" "}
              </div>
              <DialogClose asChild className="cursor-pointer">
                <X size={23} />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>
        {/* modall content */}
        <SerchModalContent />
      </DialogContent>
    </Dialog>
  );
}
