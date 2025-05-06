"use client";
import { useAuth } from "@/components/AuthProvider";
import HeaderTitle from "@/components/headerTitle/HeaderTitle";
import AddressesSkeleton from "@/components/skeleton/AddressesSkeleton";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { singleAddress, UserProfile } from "@/types/useProfile";
import { useQuery } from "@tanstack/react-query";
import { MapPinOff } from "lucide-react";
import dynamic from "next/dynamic";

const DrawerDialogDemo = dynamic(
  () => import("@/components/address/ResponDialog"),
  {
    ssr: false,
  }
);
const AddressItem = dynamic(() => import("@/components/address/AddressItem"), {
  ssr: false,
});

export default function Page() {
  const { token } = useAuth();
  const { data, isLoading } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await api.get("/Account/GetProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.address);

      return res.data;
    },
    enabled: !!token,
  });

  if (!token) {
    return null;
  }

  return (
    <div className="md:bg-card shadow-sm rounded-md py-6 md:px-4">
    <HeaderTitle className="mb-10 after:h-[2px]">آدرس های من</HeaderTitle>
  
    {isLoading ? (
      <AddressesSkeleton />
    ) : (
      <>
        {!(data?.address as any[])?.length ? (
          <p className="flex items-center justify-center gap-x-2 text-muted-foreground text-sm py-14">
            <span>
              <MapPinOff size={20} />
            </span>
            <span>آدرسی یافت نشد</span>
          </p>
        ) : (
          <div className="space-y-4 md:my-0 h-[300px] md:h-[388px] shadow-inner overflow-y-auto">
            {(data?.address as singleAddress[])?.map((item: singleAddress) => (
              <AddressItem key={item.id} item={item} />
            ))}
          </div>
        )}
  
        <div className="mt-5">
          <DrawerDialogDemo editMode={false}>
            <div className="flex justify-center pt-5">
              <Button
                variant={"dimsop"}
                type="submit"
                className="w-[100%] md:w-[50%]"
              >
                آدرس جدید
              </Button>
            </div>
          </DrawerDialogDemo>
        </div>
      </>
    )}
  </div>
  
  );
}
