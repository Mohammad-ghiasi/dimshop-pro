import { SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";



export default function DesktopSearchBar() {
  return (
    <>
      <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
      <div className="w-full pl-10 pr-9 sm:pl-12 sm:pr-10 rounded-full bg-input h-11 flex items-center text-[12px] text-placeholder">
        <span>دنبال چی هستی؟</span>
      </div>
    </>
  );
}
