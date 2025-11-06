import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EFormStatus } from "@/types/enum";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const StatusOptions = [
  { value: EFormStatus.DRAFT, label: "Draft" },
  { value: EFormStatus.PUBLISHED, label: "Published" },
  { value: EFormStatus.ARCHIVED, label: "Archived" },
];

export default function FilterTableForm() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Filter</h4>
            <p className="text-muted-foreground text-sm">
              Customize the table view by applying filters.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Status</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {StatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Created At</Label>
              <DatePicker
                mode="range"
                dateRange={dateRange}
                onRangeSelect={setDateRange}
              />
            </div>
          </div>
          <div className="w-full flex justify-end gap-x-3">
            <Button variant={"outline"}>Clear</Button>
            <Button>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
