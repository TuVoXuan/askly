/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

interface FilterTableFormProps {
  value: any;
  onApply: (value: any) => void;
  onReset: () => void;
  totalFilters?: number;
}

const StatusOptions = [
  { value: EFormStatus.DRAFT, label: "Draft" },
  { value: EFormStatus.PUBLISHED, label: "Published" },
  { value: EFormStatus.ARCHIVED, label: "Archived" },
];

const FilterSchema = Yup.object().shape({
  status: Yup.string(),
  createdAt: Yup.object()
    .shape({
      from: Yup.date().required(),
      to: Yup.date().required(),
    })
    .notRequired(),
});

type FilterFormValues = Yup.InferType<typeof FilterSchema>;

export default function FilterTableForm({
  value,
  onApply,
  onReset,
  totalFilters,
}: FilterTableFormProps) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues: value,
  });

  function onSubmit(data: FilterFormValues) {
    console.log(data);
    onApply(data);
    setOpen(false);
  }

  function handleClear() {
    reset(
      {
        status: "",
        createdAt: null,
      },
      {
        keepDefaultValues: false,
      }
    );
    onReset();
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4" /> Filter
          {!!totalFilters && totalFilters > 0 && (
            <Badge
              variant="secondary"
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-blue-500 text-white dark:bg-blue-600"
            >
              {totalFilters}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Filter</h4>
              <p className="text-muted-foreground text-sm">
                Customize the table view by applying filters.
              </p>
            </div>
            <div className="grid gap-2">
              <Controller
                control={control}
                name="status"
                render={({ field: { value, onChange } }) => (
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Status</Label>
                    <Select value={value} onValueChange={onChange}>
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
                )}
              />

              <Controller
                control={control}
                name="createdAt"
                render={({ field: { value, onChange } }) => (
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Created At</Label>
                    <DatePicker
                      mode="range"
                      dateRange={value}
                      onRangeSelect={onChange}
                    />
                  </div>
                )}
              />
            </div>
            <div className="w-full flex justify-end gap-x-3">
              <Button type="button" variant={"outline"} onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
