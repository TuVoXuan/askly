import { HierarchicalSelectExample } from "@/components/examples/HierarchicalSelectExample";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

interface ISettingUIDrawer {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingUIDrawer({
  open,
  onOpenChange,
}: ISettingUIDrawer) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center gap-x-3">
            <Palette className="text-gray-500" /> User Interface
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <h3 className="text-[20px] font-medium">Text style</h3>

          <div className="space-y-2 mt-3">
            <Label>Title</Label>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
              </SelectContent>
            </Select>
            <HierarchicalSelectExample />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
