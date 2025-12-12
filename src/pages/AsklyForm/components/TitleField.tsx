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
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripHorizontal, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import ItemFieldActionBar from "./ItemFieldActionBar";
import { EItemField } from "@/types/enum";
import { useItemFieldContext } from "@/contexts/ItemFieldContext";

interface ITtitleFieldProps {
  control: any;
  watch: any;
  index: number;
  id: string;
  activeItemField?: string;
  onSetActiveItemField: (id: string) => void;
  // baseName is the path prefix for the field array, e.g. "pages.0.titleField".
  // Default kept as "titleField" for backward compatibility.
  baseName?: string;
}

export default function TitleField({
  control,
  index,
  id,
  activeItemField,
  onSetActiveItemField,
  baseName,
}: ITtitleFieldProps) {
  const { remove, copy } = useItemFieldContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isActive = useMemo(() => activeItemField === id, [activeItemField, id]);

  return (
    <div
      style={style}
      className={cn(
        "relative rounded-sm border py-2 px-3 space-y-3 w-[800px] bg-white shadow",
        isActive && "border-l-[5px] border-l-blue-400"
      )}
      onClick={() => onSetActiveItemField(id)}
    >
      {isActive && (
        <ItemFieldActionBar
          index={index}
          itemFieldType={EItemField.TITLE_FIELD}
          className="absolute -right-4 top-0 translate-x-full"
        />
      )}
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
              onClick={() => copy?.(index)}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon-lg"}
              variant={"ghost"}
              className="rounded-full"
              onClick={() => remove?.(index)}
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
