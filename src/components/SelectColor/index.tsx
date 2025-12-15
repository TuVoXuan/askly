import useContrastColor from "@/hooks/color/useContrastColor";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface ISelectColorItemProps {
  color: string;
  isSelected: boolean;
  onClick?: () => void;
}

function SelectColorItem({
  color,
  isSelected,
  onClick,
}: ISelectColorItemProps) {
  const contrastColor = useContrastColor(color);

  return (
    <div
      className={cn(
        "h-6 w-6 rounded-full flex items-center justify-center hover:scale-110 transition-all ease-linear",
        isSelected && "scale-110"
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {isSelected && (
        <Check className="size-4" style={{ color: contrastColor }} />
      )}
    </div>
  );
}

interface ISelectColorProps {
  options: string[];
  value?: string;
  onValueChange?: (value?: string) => void;
  className?: string;
}

export default function SelectColor({
  options,
  value,
  onValueChange,
  className,
}: ISelectColorProps) {
  const [selectedColor, setSelectedColor] = useState<string>();

  useEffect(() => {
    setSelectedColor(value);
  }, [value]);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((color) => (
        <SelectColorItem
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onClick={() => {
            setSelectedColor(color);
            onValueChange?.(color);
          }}
        />
      ))}
    </div>
  );
}
