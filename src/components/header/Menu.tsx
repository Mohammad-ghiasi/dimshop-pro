import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";
import {
  History,
  House,
  LogOut,
  MessageCircle,
  Moon,
  ShoppingCart,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Menu() {
  const { theme, setTheme } = useTheme();
  return (
    
      <Menubar className="  border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="p-0 rounded-full overflow-hidden focus:scale-100 border-0 ">
            {" "}
            {/* اضافه کردن استایل‌های کنترل‌کننده */}
            <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
              {" "}
              {/* اندازه ثابت */}
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="object-cover"
                loading="lazy"
              />{" "}
              {/* جلوگیری از کشیدگی */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <div className="flex w-full justify-end items-center space-x-3">
                <span>محمد قیاسی</span>
                <span className="w-12 h-12 p-0 rounded-full overflow-hidden focus:scale-100 border">
                  {
                    <Avatar className="h-10 w-10 shadow-md cursor-pointer">
                      {" "}
                      {/* اندازه ثابت */}
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="object-cover"
                      />{" "}
                      {/* جلوگیری از کشیدگی */}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  }
                </span>
              </div>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>پیشخوان</span>
                <span>{<House className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>سبد خرید</span>
                <span>{<ShoppingCart className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>سفارش های من</span>
                <span>{<History className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>تیکت های من</span>
                <span>{<MessageCircle className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>جزئیات حساب </span>
                <span>{<UserRound className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>

            <MenubarSeparator />
            <MenubarItem className="md:hidden">
              <div
                className="flex w-full justify-end space-x-3"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <span className="text-sm">
                  {theme === "dark" ? "روشن" : "تاریک"}
                </span>
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 " />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 d" />
                )}
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex w-full justify-end space-x-3">
                <span>خروج</span>
                <span>{<LogOut className="h-5 w-5" />}</span>
              </div>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
  
  );
}
