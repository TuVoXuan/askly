import { cn } from "@/lib/utils";
import type React from "react";
import { Trash2, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  showDelete?: boolean;
  onClickDelete?: () => void;
  hasError?: boolean;
}

export default function PageItem({
  children,
  active,
  onClick,
  showDelete = false,
  onClickDelete,
  hasError,
}: Props) {
  return (
    <div
      className={cn(
        "w-[200px] px-3 py-1 rounded-md border cursor-pointer flex items-center justify-between hover:bg-blue-50 hover:border-blue-200",
        active && "bg-blue-50 text-blue-500 border-blue-300"
      )}
      onClick={onClick}
    >
      {children}
      <span className="flex items-center">
        {hasError && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="p-0 rounded-full cursor-default"
              >
                <CircleAlert className="size-4 text-amber-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Page has error!</p>
            </TooltipContent>
          </Tooltip>
        )}
        {showDelete && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="p-0 rounded-full hover:bg-red-100 cursor-pointer"
            onClick={() => onClickDelete?.()}
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        )}
      </span>
    </div>
  );
}
