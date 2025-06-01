"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  ChevronLeft,
  Eye,
  Heart,
  LogOut,
  MessageSquare,
  Package,
  ShoppingCart,
  User,
  UserPen,
  X,
} from "lucide-react";
import ThemeImage from "../Theme-Image";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { UserProfile } from "@/types/useProfile";
import { useState } from "react";
import { eraseCookie } from "@/lib/cookies";
import { activeType } from "./UserPanelNavigationBar";
import PersianDate from "../JaliliDtae";
import { useRouter } from "next/navigation";
import ScrollNav from "./ScrollNav";
import Link from "next/link";
import ThemeToggleButtonText from "../Toggle-mode-textButton";

export default function SheetNav({ data }: { data?: UserProfile }) {
  const [active, setActive] = useState<activeType>("userinfo");
  const router = useRouter();
  // get token
  // const { token } = useAuth();
  // const { data, isLoading } = useQuery<UserProfile, Error>({
  //   queryKey: ["userProfile"],
  //   queryFn: async () => {
  //     const res = await api.get("/Account/GetProfile", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return res.data;
  //   },
  //   enabled: !!token,
  // });
  const handleLogout = () => {
    
    eraseCookie("authToken");
    eraseCookie("userName");
    eraseCookie("userPhone");
    eraseCookie("phoneNumber");
    eraseCookie("userRole");
    window.location.href = "/";
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="w-[70%] p-0">
        <SheetHeader className="px-2">
          <div className="flex flex-row justify-between items-center">
            <div className="">
              <SheetTitle asChild>
                <ThemeImage h={90} w={90} className="mt-[1px]" />
              </SheetTitle>
            </div>
            <div className="pt-4">
              <SheetPrimitive.Close>
                <X size={16} />
              </SheetPrimitive.Close>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col px-2 mt-6 h-[90%]">
          <div className="">
            <div className="bg-[#0DA5E9] rounded-md flex flex-col justify-end text-sm py-3">
              <div className="text-center">
                <p className="text-white">{data?.user.firstName}</p>
                {/* <p className="pt-2 text-white">جمعه 19 اردیبهشت 1404 </p> */}
                <PersianDate className="pt-2 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between  pb- h-full">
            <div className="flex flex-col gap-y-3">
              {/* <Test /> */}
              <div className="flex justify-between items-center cursor-pointer transition-all hover:text-muted-foreground py rounded-lg">
                <div className="flex items-center gap-x-2 ">
                  <User className="" size={22} />
                  <span className="">حساب کاربری</span>
                </div>
                <ChevronLeft className="" size={15} />
              </div>

              <div className="w-full px-4">
                {/* <ScrollNav className="text-sm" text="سفارش های من" to="orders" /> */}
                <ScrollNav
                  to="userinfo"
                  className={`text-sm ${active === "userinfo" ? "text-[#0DA5E9]" : ""}`}
                >
                  <SheetPrimitive.Close className="w-full">
                    <div
                      onClick={() => setActive("userinfo")}
                      className="flex justify-between items-center cursor-pointer transition-all  py-4 rounded-lg"
                    >
                      <div className="flex items-center gap-x-2">
                        <UserPen size={18} />
                        <span className="text-sm">ویرایش حساب</span>
                      </div>
                      <ChevronLeft size={13} />
                    </div>
                  </SheetPrimitive.Close>
                </ScrollNav>
                <ScrollNav
                  to="orders"
                  className={`text-sm ${active === "orders" ? "text-[#0DA5E9]" : ""}`}
                >
                  <SheetPrimitive.Close className="w-full">
                    <div
                      onClick={() => setActive("orders")}
                      className="flex justify-between items-center cursor-pointer transition-all  py-4 rounded-lg"
                    >
                      <div className="flex items-center gap-x-2">
                        <Package size={18} />
                        <span className="text-sm">سفارش های من</span>
                      </div>
                      <ChevronLeft size={13} />
                    </div>
                  </SheetPrimitive.Close>
                </ScrollNav>
                <ScrollNav
                  to="likes"
                  className={`text-sm ${active === "likes" ? "text-[#0DA5E9]" : ""}`}
                >
                  <SheetPrimitive.Close className="w-full">
                    <div
                      onClick={() => setActive("likes")}
                      className="flex justify-between items-center cursor-pointer transition-all  py-4 rounded-lg"
                    >
                      <div className="flex items-center gap-x-2">
                        <Heart size={18} />
                        <span className="text-sm">مورد علاقه ها</span>
                      </div>
                      <ChevronLeft size={13} />
                    </div>
                  </SheetPrimitive.Close>
                </ScrollNav>
                <ScrollNav
                  to="visited"
                  className={`text-sm ${active === "visited" ? "text-[#0DA5E9]" : ""}`}
                >
                  <SheetPrimitive.Close className="w-full">
                    <div
                      onClick={() => setActive("visited")}
                      className="flex justify-between items-center cursor-pointer transition-all  py-4 rounded-lg"
                    >
                      <div className="flex items-center gap-x-2">
                        <Eye className="t" size={18} />
                        <span className="text-sm">بازدید های اخیر</span>
                      </div>
                      <ChevronLeft size={13} />
                    </div>
                  </SheetPrimitive.Close>
                </ScrollNav>
              </div>

              <Link
                href="/chart"
                className="flex justify-between items-center cursor-pointer transition-all hover:text-muted-foreground rounded-lg"
              >
                <div className="flex items-center gap-x-2">
                  <ShoppingCart size={22} />
                  <span>سبد خرید</span>
                </div>
                <ChevronLeft size={15} />
              </Link>
              <Link
                href="/ticket"
                className="flex justify-between items-center cursor-pointer transition-all hover:text-muted-foreground py-4 rounded-lg"
              >
                <div className="flex items-center gap-x-2">
                  <MessageSquare size={22} />
                  <span>تیکت ها</span>
                </div>
                <ChevronLeft size={15} />
              </Link>
            </div>

            {/* ************ */}
            <div className="flex flex-col gap-y-5">
              <ThemeToggleButtonText />
              <div
                onClick={() => handleLogout()}
                className="flex justify-between items-center  bg-input px-6 py-4 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-x-2">
                  <span >خروج از حساب</span>
                </div>
                <LogOut />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
