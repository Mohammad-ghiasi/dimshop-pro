import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { singleAddress } from "@/types/useProfile";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const GoogleMapWithLeaflet = dynamic(() => import("./Map"), { ssr: false });

export default function DrawerDialogDemo({
  children,
  editMode,
  userAddress,
}: {
  children: React.ReactNode;
  editMode: boolean;
  userAddress?: singleAddress;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[800px] ">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center px-4 md:px-7 text-right text-muted-foreground">
            <span>{editMode ? "ویرایش آدرس" : "آدرس جدید"}</span> <DrawerClose asChild><X size={18}/></DrawerClose>
          </DialogTitle>
        </DialogHeader>
          <GoogleMapWithLeaflet
            editMode={editMode}
            userOwnAddressInfo={userAddress}
          />
          {/* <AddressForm /> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center px-4 md:px-7 text-right pt-6 pb-3 text-muted-foreground mb-4 text-md">
            <span>{editMode ? "ویرایش آدرس" : "آدرس جدید"}</span> <DrawerClose asChild><X size={15}/></DrawerClose>
          </DialogTitle>
        </DialogHeader>
        <GoogleMapWithLeaflet
          editMode={editMode}
          userOwnAddressInfo={userAddress}
        />
      </DrawerContent>
    </Drawer>
  );
}
