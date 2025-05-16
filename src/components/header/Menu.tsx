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
  ShieldUser,
  ShoppingCart,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { eraseCookie, getCookie, getSimpleCookie } from "@/lib/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@/types/useProfile";
import api from "@/lib/api";

export default function Menu() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [login, setLogin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenData = getSimpleCookie("authToken");
    setToken(tokenData);
  }, []);

  const { data } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/Account/GetProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.user);

      return res.data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    const token = getSimpleCookie("authToken");
    const admin = getCookie("userRole");
    token ? setLogin(true) : null;
    admin === "Admin" ? setAdmin(true) : null;
  }, []);

const handleLogout = () => {
    eraseCookie("authToken");
    eraseCookie("userName");
    eraseCookie("userPhone");
    eraseCookie("userRole");
    router.push("/");

    setTimeout(
      () => window.location.reload(), // Refresh the page
      300
    );
  };
  return (
    <>
      {!login ? (
        //  <Skeleton className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
        <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer rounded-full overflow-hidden">
          <Link href="/signup">
            <AvatarFallback className="pt-2">US</AvatarFallback>
          </Link>
        </Avatar>
      ) : (
        <Menubar className="  border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="p-0 rounded-full overflow-hidden focus:scale-100 border-0 ">
              {" "}
              {/* اضافه کردن استایل‌های کنترل‌کننده */}
              <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
                {" "}
                {/* اندازه ثابت */}
                <AvatarImage
                  src={data?.user.imagePath}
                  className="object-cover"
                  loading="lazy"
                />{" "}
                {/* جلوگیری از کشیدگی */}
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <div className="flex w-full justify-end items-center space-x-3">
                  <span>{data?.user.firstName || data?.user.phoneNumber}</span>
                  <span className="w-12 h-12 p-0 rounded-full overflow-hidden focus:scale-100 border">
                    {
                      <Avatar className="h-10 w-10 shadow-md cursor-pointer">
                        {" "}
                        {/* اندازه ثابت */}
                        <AvatarImage
                          src={data?.user.imagePath}
                          className="object-cover"
                        />{" "}
                        {/* جلوگیری از کشیدگی */}
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    }
                  </span>
                </div>
              </MenubarItem>
              <MenubarSeparator />
              {admin && (
                <MenubarItem>
                  <div className="flex w-full justify-end space-x-3">
                    <span>پنل ادمین</span>
                    <span>{<ShieldUser className="h-5 w-5" />}</span>
                  </div>
                </MenubarItem>
              )}
              <MenubarItem>
                <Link
                  href="/userpanel"
                  className="flex w-full justify-end space-x-3"
                >
                  <span>پیشخوان</span>
                  <span>{<House className="h-5 w-5" />}</span>
                </Link>
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
              <MenubarItem onClick={() => handleLogout()}>
                <div className="flex w-full justify-end space-x-3">
                  <span>خروج</span>
                  <span>{<LogOut className="h-5 w-5" />}</span>
                </div>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </>
  );
}
