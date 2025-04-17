import { Search } from "lucide-react";
import { Input } from "../../ui/input";

export default function DesktopSearchBar() {
  return (
    <>
      {/* آیکون سرچ سمت راست */}
      <Search className="absolute right-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />

      {/* input با padding بیشتر از سمت چپ که متن به عکس نچسبه */}
      {/* <Input
        className="w-full pl-10 pr-9 sm:pl-12 sm:pr-10 rounded-full bg-input border h-11 text-md sm:text-base focus-visible:ring-0"
        placeholder="دنبال چی هستی؟"
      /> */}
      <div  className="w-full pl-10 pr-9 sm:pl-12 sm:pr-10 rounded-full bg-input h-11 flex items-center text-[14px] text-placeholder">
        <span>دنبال چی هستی؟</span>
      </div>
    </>

  );
}
