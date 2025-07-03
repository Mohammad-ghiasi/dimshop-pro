import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useImperativeHandle, forwardRef } from "react";
import TickAnimation from "../lottieAnimations/Lott";
import { DialogClose } from "@radix-ui/react-dialog";
import { useApiQuery } from "@/hooks/useQuery";
import Image from "next/image";
import Toman from "@/svg/Toman";
import Link from "next/link";
import { X } from "lucide-react";
export type DrawerDialogRef = {
  addChart: () => void;
};
type DrawerDialogProps = {
  productId: number; // یا number اگه آیدی عددیه
};

export const ReesponsiveDrawerChart = forwardRef<DrawerDialogRef, DrawerDialogProps>(
  ({ productId }, ref) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const { data } = useApiQuery({
      queryKey: [String(productId)],
      url: `/Product/GetProduct?id=${productId}`,
    });

    // اینجا تابعی رو expose می‌کنیم که بیرون بتونی صدا بزنی
    useImperativeHandle(ref, () => ({
      addChart: () => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 4600);
      },
    }));

    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-1">
                <TickAnimation />
                <p className="text-muted-foreground">
                  کلا در سبد خرید شما اضافه شد.
                </p>
              </div>
              <DialogClose asChild>
                <X className="text-muted-foreground" size={17} />
              </DialogClose>
            </div>
            <hr />
            <div className="flex items-center gap-x-4 text-muted-foreground">
              <Image
                alt={data?.product.name}
                src={data?.product.imagePath}
                width={80}
                height={80}
              />
              <div className="">
                <p>{data?.product.name}</p>
                <p className="flex gap-x-1 text-sm">
                  {" "}
                  <span>
                    {(
                      data?.product.price -
                      (data?.product.price * data?.product.discount) / 100
                    ).toLocaleString("fa-IR")}
                  </span>{" "}
                  <span>
                    <Toman height={15} width={15} />
                  </span>
                </p>
              </div>
            </div>
            <Link href="/chart">
              <Button variant="dimsop" className="w-full">
                تکمیل خرید
              </Button>
            </Link>
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="pb-2 px-3">
          <div className="flex justify-between items-center pt-5 pb-5">
            <div className="flex items-center gap-x-2">
              <TickAnimation />
              <p className="text-muted-foreground text-sm">
                کلا در سبد خرید شما اضافه شد.
              </p>
            </div>
            <DrawerClose asChild>
              <X className="text-muted-foreground" size={16} />
            </DrawerClose>
          </div>
          <hr />
          <div className="flex items-center gap-x-2 pt-5 pb-5">
            <Image
              alt={data?.product.name}
              src={data?.product.imagePath}
              width={80}
              height={80}
            />
            <div className="text-muted-foreground">
              <p>{data?.product.name}</p>
              <p className="flex gap-x-1 text-sm">
                <span>
                  {(
                    data?.product.price -
                    (data?.product.price * data?.product.discount) / 100
                  ).toLocaleString("fa-IR")}
                </span>
                <span>
                  <Toman height={15} width={15} className="text-muted-foreground" />
                </span>
              </p>
            </div>
          </div>
          <Link href="/chart">
            <Button className="w-full" variant="dimsop">
              تکمیل خرید
            </Button>
          </Link>
        </DrawerContent>
      </Drawer>
    );
  }
);
ReesponsiveDrawerChart.displayName = "ReesponsiveDrawerChart";

