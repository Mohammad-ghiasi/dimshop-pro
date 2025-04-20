import dynamic from "next/dynamic";
import {
  Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import SerchModalContent from "./SerchModalContent";

const DesktopSearchBar = dynamic(() => import("./DesktopSearchBar"), { ssr: false });
const ThemeImage = dynamic(() => import("@/components/Theme-Image"), { ssr: false });
const XIcon = dynamic(() => import("lucide-react").then(mod => mod.X), { ssr: false });

export default function DesktopSearchBarModall() {
  return (
    <Dialog>
      <DialogTrigger className="hidden lg:block relative flex-1 w-full lg:max-w-2xl cursor-pointer text-sm md:text-md">
        <DesktopSearchBar />
      </DialogTrigger>

      <DialogContent className="w-full max-w-3xl h-auto">
        <DialogHeader className="mb-5">
          <DialogTitle asChild>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                در{" "}
                <div className="mt-[-4px]">
                  <ThemeImage w={80} h={50} />
                </div>{" "}
                جستجو کنید.
              </div>
              <DialogClose asChild aria-label="بستن جستجو" className="cursor-pointer">
                <XIcon size={23} />
              </DialogClose>
            </div>
          </DialogTitle>
        </DialogHeader>

        <SerchModalContent />
      </DialogContent>
    </Dialog>
  );
}
