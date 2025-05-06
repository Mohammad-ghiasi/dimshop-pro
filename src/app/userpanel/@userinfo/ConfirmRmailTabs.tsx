"use client";
import { danaLight } from "@/app/styles/fonts";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { emailSender } from "@/lib/emailSender";
import { useState } from "react";
import ConfirmEmailOTP from "./ConfirmEmailOTP";

export default function ConfirmRmailTabs({email}: {email: string}) {
  const [activeTab, setActiveTab] = useState<"sendEmail" | "confirmCode">(
    "sendEmail"
  );
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmailHandler = async () => {
    setLoading(true);
    await emailSender(email);
    setActiveTab("confirmCode");
    setLoading(false);
  };

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="confirmCode" className="w-full">
          تایید کد
        </TabsTrigger>
        <TabsTrigger value="sendEmail" className="w-full">
          ارسال کد
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sendEmail" asChild>
        <div className="flex flex-col gap-6 mt-6 w-full text-end p-0">
          {/* عنوان و توضیح */}
          <div>
            <h3 className="text-base font-bold">ارسال کد تایید ایمیل</h3>
            <p className="text-[13px] md:text-sm text-muted-foreground mt-1">
              کد تایید به ایمیل شما ارسال خواهد شد. لطفاً ایمیل خود را بررسی
              کنید
            </p>
          </div>

          {/* دکمه‌ها */}
          <DialogFooter className="flex flex-col-reverse md:flex-row gap-3 md:justify-end">
            {/* دکمه بستن */}
            <DialogClose asChild>
              <Button variant="destructive" className="w-full md:w-auto">
                بستن
              </Button>
            </DialogClose>

            {/* دکمه ارسال */}
            <Button
              type="button"
              variant="dimsop"
              className={`${danaLight.className} w-full md:w-auto`}
              onClick={() => sendEmailHandler()}
              loading={loading}
            >
              ارسال کد تایید به ایمیل
            </Button>
          </DialogFooter>
        </div>
      </TabsContent>
      <TabsContent value="confirmCode">
        <ConfirmEmailOTP email={email}/>
      </TabsContent>
    </Tabs>
  );
}
