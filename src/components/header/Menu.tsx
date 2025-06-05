import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import {
  History,
  House,
  MessageCircle,
  ShieldUser,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import api from "@/lib/api";
import Logout from "../Logout";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { decryptData } from "@/lib/crypto";

export default async function Menu() {
  const token = cookies().get("authToken")?.value;
  const haseRolerole = cookies().get("userRole")?.value;
  const decodedRole = decryptData(haseRolerole).replace(/^"|"$/g, "");
  const isadmin: boolean =
    decodedRole === "1" || decodedRole === "2"
      ? true
      : decodedRole === "3"
        ? false
        : false;

  let data;
  try {
    data = await api.get("/Account/GetProfile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return (
      <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer rounded-full overflow-hidden">
        <Link href="/signup">
          <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
            {" "}
            {/* اندازه ثابت */}
            <AvatarImage
              src="/images/sampleUser.jpg"
              className="object-cover w-full h-full"
              loading="eager"
              alt="User avatar"
            />{" "}
            {/* جلوگیری از کشیدگی */}
            {/* <AvatarFallback className="object-cover">US</AvatarFallback> */}
          </Avatar>
        </Link>
      </Avatar>
    ); // یا یک fallback ساده
  }

  return (
    <>
      <Menubar className="  border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="p-0 rounded-full overflow-hidden focus:scale-100 border-0 ">
            {" "}
            {/* اضافه کردن استایل‌های کنترل‌کننده */}
            <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
              {" "}
              {/* اندازه ثابت */}
              <AvatarImage
                src={data?.data.user.imagePath || "/default-avatar.png"}
                className="object-cover w-full h-full"
                loading="eager"
                alt="User avatar"
              />{" "}
              {/* جلوگیری از کشیدگی */}
              <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
                {" "}
                {/* اندازه ثابت */}
                <AvatarImage
                  src="/images/sampleUser.jpg"
                  className="object-cover w-full h-full"
                  loading="eager"
                  alt="User avatar"
                />{" "}
                {/* جلوگیری از کشیدگی */}
                {/* <AvatarFallback className="object-cover">US</AvatarFallback> */}
              </Avatar>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <div className="flex w-full justify-end items-center space-x-3">
                <span>
                  {data?.data.user.firstName || data?.data.user.phoneNumber}
                </span>
                <span className="w-12 h-12 p-0 rounded-full overflow-hidden focus:scale-100 border">
                  {
                    <Avatar className="h-10 w-10 shadow-md cursor-pointer">
                      {" "}
                      {/* اندازه ثابت */}
                      <AvatarImage
                        src={data?.data.user.imagePath}
                        className="object-cover"
                      />{" "}
                      {/* جلوگیری از کشیدگی */}
                      <Avatar className="h-8 w-8 md:h-10 md:w-10 shadow-md cursor-pointer">
                        {" "}
                        {/* اندازه ثابت */}
                        <AvatarImage
                          src="/images/sampleUser.jpg"
                          className="object-cover w-full h-full"
                          loading="eager"
                          alt="User avatar"
                        />{" "}
                        {/* جلوگیری از کشیدگی */}
                        {/* <AvatarFallback className="object-cover">US</AvatarFallback> */}
                      </Avatar>
                    </Avatar>
                  }
                </span>
              </div>
            </MenubarItem>
            <MenubarSeparator />
            {isadmin && (
              <MenubarItem>
                <Link
                  href="/adminpanel"
                  className="flex w-full justify-end space-x-3"
                >
                  <span>پنل ادمین</span>
                  <span>{<ShieldUser className="h-5 w-5" />}</span>
                </Link>
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

            <MenubarSeparator />
            <Logout />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
