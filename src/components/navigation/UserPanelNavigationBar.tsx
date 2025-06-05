"use client";
import { UserProfile } from "@/types/useProfile";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Eye,
  Heart,
  LogOut,
  MessageSquare,
  Package,
  ShoppingCart,
  User,
  UserPen,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "../AuthProvider";
import api from "@/lib/api";
import Link from "next/link";
import ScrollNav from "@/components/navigation/ScrollNav";
import { useState } from "react";
import ThemeToggleButtonText from "../Toggle-mode-textButton";
import { eraseCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import PersianDate from "../JaliliDtae";

export type activeType = "userinfo" | "orders" | "likes" | "visited";

export default function UserPanelNavigationBar() {
  const [active, setActive] = useState<activeType>("userinfo");
  const router = useRouter();
  // get token
  const { token } = useAuth();
  const { data } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/Account/GetProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    enabled: !!token,
  });
  const handleLogout = () => {
    eraseCookie("authToken");
    eraseCookie("userName");
    eraseCookie("userPhone");
    eraseCookie("phoneNumber");
    eraseCookie("userRole");
    router.push("/");

    setTimeout(
      () => window.location.reload(), // Refresh the page
      300
    );
  };
  return (
    <div className="hidden lg:block md:bg-card flex-[3] 2xl:flex-[2] shadow-sm ">
      <div className="flex flex-col h-full">
        <div className="">
          <div className="bg-[#0DA5E9] mx-3 mt-4 rounded-md flex flex-col justify-end p-2 pb-14 text-sm">
            <div className="text-center pt-2">
              <p className="text-white">{data?.user.firstName}</p>
              {/* <p className="pt-2 text-white">جمعه 19 اردیبهشت 1404 </p> */}
              <PersianDate className="pt-2 text-white" />
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute top-[-34px]">
              <div className="relative w-[80px] h-[80px]">
                <Image
                  alt="user-imahe"
                  src={data?.user.imagePath || "/images/sampleUser.jpg"}
                  fill
                  loading="lazy"
                  objectFit="cover"
                  className=" rounded-full overflow-hidden shadow-md ring-4 ring-card"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col justify-between mx-3 pb-6 h-full">
          <div className="flex flex-col gap-y-3">
            {/* <Test /> */}
            <div className="flex justify-between items-center cursor-pointer transition-all hover:text-muted-foreground py-4 rounded-lg">
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
              </ScrollNav>
              <ScrollNav
                to="orders"
                className={`text-sm ${active === "orders" ? "text-[#0DA5E9]" : ""}`}
              >
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
              </ScrollNav>
              <ScrollNav
                to="likes"
                className={`text-sm ${active === "likes" ? "text-[#0DA5E9]" : ""}`}
              >
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
              </ScrollNav>
              <ScrollNav
                to="visited"
                className={`text-sm ${active === "visited" ? "text-[#0DA5E9]" : ""}`}
              >
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
              </ScrollNav>
            </div>

            <Link
              href="/chart"
              className="flex justify-between items-center cursor-pointer transition-all hover:text-muted-foreground py-4 rounded-lg"
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
                <span>خروج از حساب</span>
              </div>
              <LogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
