import { Camera, SearchIcon } from "lucide-react";

export default function DesktopSearchBar() {
  return (
    <>
      <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
      <div className="w-full pr-9 sm:pr-10 rounded-full bg-input h-11 flex items-center justify-between text-[12px] text-placeholder">
        <span>دنبال چی هستی؟</span>
        {/* <span className="pl-3">
          <Camera
            className="text-purple-600 font-semibold"
            size={22}
          />
        </span> */}
      </div>
    </>
  );
}
