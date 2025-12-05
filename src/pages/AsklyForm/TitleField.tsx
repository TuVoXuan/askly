/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";

interface ITtitleFieldProps {
  control: any;
  watch: any;
  index: number;
  id: string;
  onRemove: (index: number) => void;
  // baseName is the path prefix for the field array, e.g. "pages.0.titleField".
  // Default kept as "titleField" for backward compatibility.
  baseName?: string;
}

export default function TitleField({
  control,
  index,
  id,
  onRemove,
  baseName,
}: ITtitleFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      className="rounded-sm border py-2 px-3 space-y-3 w-[800px] bg-white"
    >
      <div className="flex justify-center w-full">
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="px-1 hover:bg-accent text-accent-foreground rounded-sm"
        >
          <GripHorizontal />
        </button>
      </div>

      <Controller
        control={control}
        name={`${baseName}.${index}.titleField.title`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder="Doesn't have title"
            helperText={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={`${baseName}.${index}.titleField.description`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <Textarea
              value={value}
              onChange={onChange}
              placeholder="Description (optional)"
              error={!!error?.message}
            />
            {error?.message && (
              <p className="mt-1 text-xs text-red-400">{error.message}</p>
            )}
          </div>
        )}
      />

      <Separator orientation="horizontal" />
      <div className="flex justify-end items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon-lg"}
              variant={"ghost"}
              className="rounded-full"
              onClick={() => onRemove(index)}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
