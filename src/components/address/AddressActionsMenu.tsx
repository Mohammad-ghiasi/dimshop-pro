import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import { SquarePen, Trash2, EllipsisVertical } from "lucide-react";
import DrawerDialogDemo from "./ResponDialog";
import { singleAddress } from "@/types/useProfile";

export default function AddressActionsMenu({
  item,
  onDelete,
}: {
  item: singleAddress;
  onDelete: (id: number) => void;
}) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="p-0 m-0" asChild>
          <EllipsisVertical size={16} className="text-muted-foreground" />
        </MenubarTrigger>

        <MenubarContent>
          <DrawerDialogDemo editMode={true} userAddress={item}>
            <div className="flex w-full justify-end space-x-2 p-2 text-sm cursor-pointer">
              <span className="text-customgreen">ویرایش آدرس</span>
              <SquarePen
                size={17}
                className="text-customgreen transition-all hover:scale-105"
              />
            </div>
          </DrawerDialogDemo>

          <div
            className="flex w-full justify-end space-x-2 p-2 text-sm cursor-pointer"
            onClick={() => onDelete(item.id)}
          >
            <span className="text-destructive">حذف آدرس</span>
            <Trash2
              size={17}
              className="text-destructive transition-all hover:scale-105"
            />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
