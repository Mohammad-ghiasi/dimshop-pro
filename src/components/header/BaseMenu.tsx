import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import HeaderPrvider from "../ui-providers/HeaderPrvider";
import dynamic from "next/dynamic";
import ThemeImage from "../Theme-Image";
import ThemeToggleButton from "../Toggle-mode";
import Menu from "./Menu";

const DesktopSearchBarModall = dynamic(
  () => import("./desktop/DesktopSearchModal"),
  {
    ssr: false,
  }
);

const MobileSerchDrawer = dynamic(() => import("./mobile/MobileSerchDrawer"), {
  ssr: false,
});


export default function BaseMenu() {
  return (
    <HeaderPrvider>
      {/* Container با عرض محدود */}
      <div className="relative flex items-center justify-between">
        {/* shadow div */}
        <div className="w-[98%] rounded-lg h-full absolute left-2 right-2 mx-auto z-[-10] shadow-lg"></div>
        {/* لوگو */}
        <div className="hidden lg:block [&_path]:fill-foreground cursor-pointer flex-shrink-0">
          <Link href="/" className=" flex items-center  mt-[-3px]">
            <ThemeImage w={115} h={50} />
          </Link>
        </div>

        {/* نوار جستجو */}
        <DesktopSearchBarModall />
        <MobileSerchDrawer />

        {/* منوی ابزار */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
            <ShoppingCart className="h-6 w-6" />
            <ThemeToggleButton />
            <Menu />
          </div>
        </div>
      </div>
    </HeaderPrvider>
  );
}
