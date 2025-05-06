import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { singleAddress, userAddressForm } from "@/types/useProfile";
import { addressInfoSchema } from "@/yup/userInfoResolver";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthProvider";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useEffect, useRef } from "react";
import { danaLight } from "@/app/styles/fonts";
import { DrawerClose } from "../ui/drawer";

function AddressForm({
  defaulValueMap,
  userAddress,
  editeMode,
  loading,
}: {
  defaulValueMap?: string;
  userAddress?: singleAddress;
  editeMode: boolean;
  loading: boolean;
}) {
  const { toast } = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { token } = useAuth();
  const didMountRef = useRef(editeMode);
  const drawerCloseRef = useRef<HTMLButtonElement>(null); // برای بستن دراور

  // hookform config
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<userAddressForm>({
    resolver: yupResolver(addressInfoSchema),
  });

  useEffect(() => {
    if (defaulValueMap) {
      if (didMountRef.current) {
        reset({
          address: userAddress?._Address || "",
          postCode: userAddress?.postCode || "",
        });
        didMountRef.current = false;
      } else {
        reset({
          address: defaulValueMap,
          postCode: userAddress?.postCode || "",
        });
      }
    }
  }, [defaulValueMap, reset, userAddress]);

  // edit address mutation
  const editMutation = useMutation({
    mutationFn: async (updatedData: userAddressForm) => {
      console.log("edit called");
      const res = await api.put("/Account/EditAddress", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        description: "آدرس با موفقیت ویرایش شد",
        variant: "success",
      });
      drawerCloseRef.current?.click();
    },
    onError: (error) => {
      console.error("خطا در ویرایش اطلاعات:", error);
      toast({
        description: "خطایی در ویرایش آدرس پیش اومد",
        variant: "destructive",
      });
    },
  });

  // add address muatation
  const mutation = useMutation({
    mutationFn: async (updatedData: userAddressForm) => {
      
      const res = await api.post("/Account/AddAddress", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast({
        description: "اطلاعات با موفقیت ذخیره شد",
        variant: "success",
      });
      // reset();
      drawerCloseRef.current?.click();
    },
    onError: (error) => {
      console.error("خطا در ذخیره اطلاعات:", error);
      toast({
        description: "خطایی در ذخیره اطلاعت پیش اومده",
        variant: "destructive",
      });
    },
  });
  const onSubmit = async (formData: any) => {
    if (editeMode) {
      const payload: any = {
        id: userAddress?.id,
        address: formData.address,
        postCode: formData.postCode,
      };

      editMutation.mutate(payload);
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="px-3 md:px-6">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-0 md:gap-y-5">
          <div className="space-y-1">
            <Label htmlFor="address" className="text-sm font-medium">
              آدرس
            </Label>
            <Input
              id="address"
              className={`${danaLight.className} text-muted-foreground bg-input text-sm`}
              {...register("address")}
              placeholder="ادرس محل دریافت"
              error={Boolean(errors.address)}
              errorMessage={errors.address?.message}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="postCode" className="text-sm font-medium">
              کد پستی
            </Label>
            <Input
              id="postCode"
              className={`${danaLight.className} text-muted-foreground bg-input text-sm`}
              {...register("postCode")}
              error={Boolean(errors.postCode)}
              errorMessage={errors.postCode?.message}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant={"dimsop"}
            type="submit"
            className="w-[100%] md:w-[50%] mb-5 md:mb-0"
            loading={editeMode ? editMutation.isPending : mutation.isPending}
            disabled={editeMode ? editMutation.isPending : mutation.isPending}
          >
            {editeMode ? "ویرایش آدرس" : "ثبت آدرس"}
          </Button>

          <DrawerClose asChild>
            <button ref={drawerCloseRef} className="hidden" />
          </DrawerClose>
        </div>
      </form>
    </div>
  );
}

export default React.memo(AddressForm);
