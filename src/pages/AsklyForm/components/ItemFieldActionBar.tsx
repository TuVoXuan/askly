import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useItemFieldContext } from "@/contexts/ItemFieldContext";
import { cn } from "@/lib/utils";
import { EItemField } from "@/types/enum";
import { ALargeSmall, CirclePlus } from "lucide-react";

interface IActionBarProps {
  index: number;
  itemFieldType: string;
  className?: string;
}

export default function ItemFieldActionBar({
  index,
  itemFieldType,
  className,
}: IActionBarProps) {
  const { append: addItemField, insert: insertItemField } =
    useItemFieldContext();

  function handleAppendItemField(fieldType: string) {
    if (fieldType === EItemField.CUSTOM_FIELD) {
      addItemField?.({
        type: EItemField.CUSTOM_FIELD,
        customField: {
          question: "",
          isRequired: false,
          fieldType: "",
        },
      });
    } else {
      insertItemField?.(
        itemFieldType === EItemField.TITLE_FIELD ? index + 1 : index,
        {
          type: EItemField.TITLE_FIELD,
          titleField: {
            title: "",
            description: "",
          },
        }
      );
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-y-1 p-1 rounded-md border shadow",
        className
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleAppendItemField(EItemField.CUSTOM_FIELD)}
            size={"icon"}
            className="rounded-full"
            variant={"ghost"}
          >
            <CirclePlus className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add question</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleAppendItemField(EItemField.TITLE_FIELD)}
            size={"icon"}
            className="rounded-full"
            variant={"ghost"}
          >
            <ALargeSmall className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add title and description</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
