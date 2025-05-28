"use client"
import { persianNumbers } from "@/lib/parsianNumber";
import React from "react";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/useMutation";
import { Trash2 } from "lucide-react";
import { UserWithRole } from "@/types/userType";

export default function UserItem({
  user,
  index,
}: {
  user: UserWithRole;
  index: number;
}) {
  const levelUpMutation = useApiMutation({
    method: "post",
    url: "/ManageUsers/LevelUpUser",
    invalidateQueryKey: "userManager",
    onSuccessMessage: "کاربر ارتغاع یافت",
    onErrorMessage: "خطاارتغاع کربر",
  });
  const levelDwomMutation = useApiMutation({
    method: "post",
    url: "/ManageUsers/LevelDownUser",
    invalidateQueryKey: "userManager",
    onSuccessMessage: "کاربر تنزل یافت",
    onErrorMessage: "خطا در تنزل کربر",
  });
  const deleteUserMutation = useApiMutation({
    method: "delete",
    url: "ManageUsers/DeleteUser",
    invalidateQueryKey: "userManager",
    onSuccessMessage: "کاربر حذف شد",
    onErrorMessage: "خطا درحذف کربر",
  });

  return (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.user.firstName || "نامشخص"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="text-sm text-gray-900 dark:text-gray-200">
          {persianNumbers(user.user.phoneNumber)}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <p className="text-sm text-gray-900 dark:text-gray-200 truncate max-w-[180px]">
            {user.user.email || "نامشخص"}
          </p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 w-fit ${
              user.user.email
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {user.user.email ? "تایید شده" : "تایید نشده"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            user.role === "1"
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              : user.role === "2"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
          }`}
        >
          {user.role === "1" ? "مدیر" : user.role === "2" ? "ادمین" : "کاربر"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {user.role === "1" ? (
          <Button
            size="sm"
            variant={"outline"}
            disabled
            className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
          >
            مدیر
          </Button>
        ) : user.role === "2" ? (
          <Button
            size="sm"
            variant={"destructive"}
            onClick={() => {
              levelDwomMutation.mutate({ id: user.user.id });
            }}
          >
            تنزل
          </Button>
        ) : (
          <Button
            size="sm"
            variant={"dimsop"}
            onClick={() => {
              levelUpMutation.mutate({ id: user.user.id });
            }}
          >
            ارتغا
          </Button>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {user.role === "1" ? (
          <Button
            size="icon"
            variant={"ghost"}
            disabled
            onClick={() => {
              deleteUserMutation.mutate({ id: user.user.id });
            }}
          >
            <Trash2 className="text-destructive" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant={"ghost"}
            onClick={() => {
              deleteUserMutation.mutate({ id: user.user.id });
            }}
          >
            <Trash2 className="text-destructive" />
          </Button>
        )}
      </td>
    </tr>
  );
}
