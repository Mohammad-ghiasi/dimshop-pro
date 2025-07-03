import Link from "next/link";
import HeaderPrvider from "../ui-providers/HeaderPrvider";
import ThemeToggleButton from "../Toggle-mode";
import Menu from "./Menu";
import SsrThemeImage from "../Ssr-Theme-image";
import DesktopSearchBarModall from "./desktop/DesktopSearchModal";
import MobileSerchDrawer from "./mobile/MobileSerchDrawer";
import MainChart from "../chart/MainChart";

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
            {/* <ThemeImage w={115} h={50} /> */}
            <SsrThemeImage w={115} h={50} />
          </Link>
        </div>

        {/* نوار جستجو */}
        <DesktopSearchBarModall />
        <MobileSerchDrawer />

        {/* منوی ابزار */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
            {/* <ShoppingCart className="h-6 w-6" /> */}
            <MainChart />
            <ThemeToggleButton />
            <Menu />
          </div>
        </div>
      </div>
    </HeaderPrvider>
  );
}
