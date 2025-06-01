"use client"
import { MenubarItem } from "./ui/menubar";
import { LogOut } from "lucide-react";
import { eraseCookie } from "@/lib/cookies";

export default function Logout() {
  const handleLogout = () => {
    eraseCookie("authToken");
    eraseCookie("userName");
    eraseCookie("userPhone");
    eraseCookie("phoneNumber");
    eraseCookie("userRole");
    window.location.href = "/";
  };
  return (
    <MenubarItem onClick={() => handleLogout()}>
      <div className="flex w-full justify-end space-x-3">
        <span>خروج</span>
        <span>{<LogOut className="h-5 w-5" />}</span>
      </div>
    </MenubarItem>
  );
}
