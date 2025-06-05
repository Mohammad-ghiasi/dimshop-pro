import { Badge } from "@/components/ui/badge";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import ConfirmRmailTabs from "./ConfirmRmailTabs";

export default function ConfirmEmail({email}: {email?: string}) {
  if (!email) {
    return null
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className="absolute left-2 top-[18px]  -translate-y-1/2 z-10 text-xs px-2 py-0.5 pt-[4px] text-gray-700 text-[10px] bg-warning cursor-pointer">
          تأیید نشده
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] px-3 md:px-5">
        <ConfirmRmailTabs email={email}/>
      </DialogContent>
    </Dialog>
  );
}
