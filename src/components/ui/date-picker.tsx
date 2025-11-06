import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./calendar";
import type { DateRange } from "react-day-picker";
import moment from "moment";

interface DatePickerProps {
  mode?: "single" | "range";
  selectedDate?: Date;
  dateRange?: DateRange;
  onSingleSelect?: (date: Date | undefined) => void;
  onRangeSelect?: (dateRange: DateRange | undefined) => void;
}

export default function DatePicker({
  mode = "single",
  selectedDate,
  dateRange,
  onRangeSelect,
  onSingleSelect,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  function renderSelectedDate() {
    if (mode === "single" && selectedDate) {
      return moment(selectedDate).format("DD/MM/YYYY");
    }
    if (mode === "range" && dateRange) {
      return `${moment(dateRange.from).format("DD/MM/YYYY")} - ${moment(
        dateRange.to
      ).format("DD/MM/YYYY")}`;
    }
    return "Select date";
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="justify-between font-normal w-fit"
        >
          {renderSelectedDate()}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        {mode === "single" && (
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              onSingleSelect?.(date);
              setOpen(false);
            }}
          />
        )}
        {mode === "range" && (
          <Calendar
            mode="range"
            selected={dateRange}
            captionLayout="dropdown"
            onSelect={(range) => {
              onRangeSelect?.(range);
              setOpen(false);
            }}
            numberOfMonths={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
