import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

type PositionType = {
  top: number;
  left: number;
  width: number;
};

type HierarchicalOption = {
  name: string;
  value: string;
  childOpts?: HierarchicalOption[];
};

interface IHierarchicalSelectItemProps {
  option: HierarchicalOption;
  onValueChange: (value: HierarchicalOption) => void;
  selectedValue?: string;
  setSelected?: (selected: boolean) => void;
  menuWidth?: number;
}

function HierarchicalSelectItem({
  option,
  onValueChange,
  selectedValue,
  setSelected,
  menuWidth,
}: IHierarchicalSelectItemProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedValue === option.value) {
      setSelected?.(true);
      setIsSelected(true);
    }
  }, [selectedValue]);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onValueChange(option);
  }

  return (
    <div
      className="group pointer-events-auto hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      onClick={handleClick}
    >
      {isSelected && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 shrink-0">
          <Check className="size-4" />
        </span>
      )}

      <span title={option.name} className="truncate min-w-0 inline-block">
        {option.name}
      </span>
      {option.childOpts && <ChevronRight className="size-4" />}

      {option.childOpts && (
        <div
          className="group-hover:block hidden absolute left-0 -translate-x-full top-0 py-2 bg-white border shadow rounded-sm z-9999"
          style={{ width: menuWidth ? `${menuWidth}px` : undefined }}
        >
          {option.childOpts.map((chidOpt) => (
            <HierarchicalSelectItem
              key={chidOpt.value}
              option={chidOpt}
              onValueChange={onValueChange}
              selectedValue={selectedValue}
              setSelected={setIsSelected}
              menuWidth={menuWidth}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface IHierarchicalSelectProps {
  options: HierarchicalOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function HierarchicalSelect({
  options,
  value,
  onValueChange,
  className,
}: IHierarchicalSelectProps) {
  const buttonSelectRef = useRef<HTMLButtonElement>(null);
  const parentListOptionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [btnSelectPosition, setBtnSelectPosition] = useState<PositionType>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [selectedOption, setSelectedOption] = useState<HierarchicalOption>();

  function findSelectedOption(
    options: HierarchicalOption[],
    selectedValue: string
  ): HierarchicalOption | null {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.value == selectedValue) {
        return option;
      }
      if (option.childOpts) {
        const found = findSelectedOption(option.childOpts, selectedValue);
        if (found) return found;
      }
    }
    return null;
  }

  function togglePortal() {
    if (buttonSelectRef.current) {
      const rect = buttonSelectRef.current.getBoundingClientRect();
      setBtnSelectPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });

      setOpen((open) => !open);
    }
  }

  function turnOffOptionsPortal() {
    setOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickOnParentList = parentListOptionRef.current?.contains(
        event.target as Node
      );
      if (!isClickOnParentList) {
        turnOffOptionsPortal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const foundOption = findSelectedOption(options, value);
      if (foundOption) {
        setSelectedOption(foundOption);
      }
    }
  }, [value]);

  return (
    <>
      <Button
        ref={buttonSelectRef}
        variant={"outline"}
        className={cn(
          "flex items-center justify-between gap-x-3 min-w-[200px]",
          className
        )}
        onClick={togglePortal}
      >
        <span className="min-w-0 truncate">
          {selectedOption ? selectedOption.name : "Select value...."}
        </span>
        <span>
          <ChevronDown className="size-4" />
        </span>
      </Button>
      {open &&
        ReactDOM.createPortal(
          <div
            ref={parentListOptionRef}
            style={{
              position: "absolute",
              top: btnSelectPosition.top + 4,
              left: btnSelectPosition.left,
              width: btnSelectPosition.width,
            }}
            className="py-2 border rounded-sm shadow z-9999 bg-white pointer-events-auto"
          >
            {options.map((option) => (
              <HierarchicalSelectItem
                key={option.value}
                option={option}
                selectedValue={selectedOption?.value}
                menuWidth={btnSelectPosition.width}
                onValueChange={(value) => {
                  setSelectedOption(value);
                  onValueChange?.(value.value);
                  turnOffOptionsPortal();
                }}
              />
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
