import { singleAddress } from "@/types/useProfile";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuth } from "../AuthProvider";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import DrawerDialogDemo from "./ResponDialog";
import { persianNumbers } from "@/lib/parsianNumber";
import { danaLight } from "@/app/styles/fonts";
import { SquarePen, Trash2 } from "lucide-react";
import AddressActionsMenu from "./AddressActionsMenu";

export default function AddressItem({ item }: { item: singleAddress }) {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient: QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete("/Account/DeleteAddress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        description: "آدرس با موفقیت حذف شد",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("خطا در ذخیره اطلاعات:", error);
      toast({
        description: "خطایی در حذف آدرس پیش اومده",
        variant: "destructive",
      });
    },
  });
  return (
    <div
      key={item.id}
      className="group px-4 py-2 border-r-2 border-customgreen rounded-e-md bor shadow-sm flex flex-row justify-between  items-center gap-y-2 transition-all hover:bg-input"
    >
      <div className="flex flex-row items-center justify-between text-muted-foreground transition-all lg:hover:scale-[101%] cursor-default w-full">
        <div className="text-[13px] md:text-[15px] w-[80%] md:w-[60%]">
          <p className="flex items-center pb-1  text-xs md:text-sm">
            <span>آدرس:&nbsp;</span>

            <span
              className={`${danaLight.className} truncate  overflow-hidden`}
              // style={{ maxWidth: "50%" }} // مقدار maxWidth را می‌توانید تنظیم کنید
            >
              {item._Address || "نامشخص"}
            </span>
          </p>
          <p className="flex items-center pb-1 text-xs md:text-sm">
            <span>کد پستی:&nbsp;</span>
            <span className={`${danaLight.className} text-xs md:text-sm`}>
              {persianNumbers(item.postCode) || "نامشخص"}
            </span>
          </p>
        </div>

        <div className="block lg:hidden">
          <AddressActionsMenu
            item={item}
            onDelete={(id: number) => mutation.mutate(id)}
          />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DrawerDialogDemo editMode={true} userAddress={item}>
            <span>
              <SquarePen
                size={19}
                className="text-customgreen transition-all hover:scale-105 cursor-pointer"
              />
            </span>
          </DrawerDialogDemo>
          <span
            onClick={() => {
              mutation.mutate(item.id);
            }}
          >
            <Trash2
              size={19}
              className="text-destructive transition-all hover:scale-105 cursor-pointer"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
