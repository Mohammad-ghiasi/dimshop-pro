"use client";
import { ThemeToggleButton } from "@/components/Toggle-mode";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CutomDialog } from "./comp/Dialog";
import { DrawerDialogDemo } from "./comp/ResponDialog";
import { AlertDialogDemo } from "./comp/AlertDialog";
import { SheetDemo } from "./comp/Sheet";

export default function page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-4 gap-y-10 mt-20">
      <p>hi</p>
      <div className="">
        <Button
          loading={loading}
          variant={"default"}
          size={"lg"}
          onClick={() => {
            setLoading(!loading);
          }}
        >
          Do something
        </Button>
      </div>
      <div className="">
        <ThemeToggleButton />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Button
          onClick={() => {
            toast({
              //   title: "Scheduled: Catch up",
              description: "کد تایید به شماره شما ارسال شد.",
              variant: "default",
            });
          }}
        >
          default Toast
        </Button>
        <Button
          onClick={() => {
            toast({
              //   title: "Scheduled: Catch up",
              description: "کد تایید به شماره شما ارسال شد.",
              variant: "info",
            });
          }}
        >
          info Toast
        </Button>
        <Button
          onClick={() => {
            toast({
              //   title: "Scheduled: Catch up",
              description: "کد تایید به شماره شما ارسال شد.",
              variant: "success",
            });
          }}
        >
          success Toast
        </Button>
        <Button
          onClick={() => {
            toast({
              //   title: "Scheduled: Catch up",
              description: "کد تایید به شماره شما ارسال شد.",
              variant: "destructive",
            });
          }}
        >
          error Toast
        </Button>
      </div>
      <div className="">
        <CutomDialog />
      </div>
      <div className="">
        <DrawerDialogDemo />
      </div>
      <div className="">
        <AlertDialogDemo />
      </div>
      <div className="">
        <SheetDemo />
      </div>
    </div>
  );
}
