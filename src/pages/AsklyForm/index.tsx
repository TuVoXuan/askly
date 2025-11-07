import { Button } from "@/components/ui/button";
import PageItem from "./PageItem";
import CustomField from "./CustomFIeld";

export default function AsklyForm() {
  return (
    <div className="flex flex-1 w-full">
      <div className="shrink-0 p-4 border-r space-y-2">
        <div className="flex items-center flex-col">
          <PageItem />
          <span>Page 1</span>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-3">
        <Button variant={"outline"}>Add Field</Button>
        <CustomField />
      </div>
    </div>
  );
}
