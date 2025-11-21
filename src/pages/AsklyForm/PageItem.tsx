import { cn } from "@/lib/utils";
import type React from "react";

interface Props {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

export default function PageItem({ children, active, onClick }: Props) {
  return (
    <div
      className={cn(
        "w-[200px] px-3 py-1 rounded-md border cursor-pointer",
        active && "bg-black/10"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
