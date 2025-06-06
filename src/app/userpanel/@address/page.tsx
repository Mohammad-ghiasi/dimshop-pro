"use client";
import HeaderTitle from "@/components/headerTitle/HeaderTitle";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/useQuery";
import { singleAddress, UserProfile } from "@/types/useProfile";
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
  const { data, isLoading } = useApiQuery<UserProfile>({
    queryKey: ["userProfile"],
    url: "/Account/GetProfilee",
  });

  return (
    <div className="md:bg-card shadow-sm rounded-md py-6 mt-5 lg:mt-0 md:px-4 lg:max-w-2xl overflow-x-hidden">
      <HeaderTitle className="mb-10 after:h-[2px]">آدرس های من</HeaderTitle>
        <>
          {!(data?.address as any[])?.length ? (
            <p className="flex items-center justify-center gap-x-2 text-muted-foreground text-sm py-14">
              <span>
                <MapPinOff size={20} />
              </span>
              <span>آدرسی یافت نشد!</span>
            </p>
          ) : (
            <div className="space-y-4 md:my-0 h-[300px] md:h-[384px] shadow-inner overflow-y-auto overflow-x-hidden">
              {(data?.address as singleAddress[])?.map(
                (item: singleAddress) => (
                  <AddressItem key={item.id} item={item} />
                )
              )}
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
    </div>
  );
}
