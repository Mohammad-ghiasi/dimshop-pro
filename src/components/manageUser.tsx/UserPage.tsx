"use client"
import Spinner from "@/components/Spinner";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiQuery } from "@/hooks/useQuery";
import { UserWithRole } from "@/types/userType";
import dynamic from "next/dynamic";
const UserItem = dynamic(() => import("@/components/manageUser.tsx/UserItem"), {
  ssr: false,
  loading: () => (
  <tr>
      <td colSpan={7} className="px-6 py-4 text-center">
        <Skeleton className="h-6 w-full rounded-lg" />
      </td>
    </tr>
  ),
});

export default function ManageUserPage() {
  const { data, isLoading } = useApiQuery<UserWithRole[]>({
    queryKey: ["userManager"],
    url: "/ManageUsers/GetAllUsers",
  });

  const sortedUsers = data?.sort((a: any, b: any) => {
    return parseInt(a.role) - parseInt(b.role);
  });

  return (
    <BodyPrvider>
      <p className="mb-6 text-lg">مدیریت کاربران</p>
      {isLoading && <Spinner />}
      <div className="overflow-x-scroll rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                ردیف
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                نام
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                اطلاعات تماس
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                ایمیل
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                نقش
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                ویرایش نقش
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                حذف
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedUsers?.map((user: UserWithRole, index: number) => (
              <UserItem key={user.user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </BodyPrvider>
  );
}
