import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { ChevronDown, ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";

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
  setHoveredPosition?: (value: PositionType) => void;
  setChildOpts?: (opts: HierarchicalOption[]) => void;
  onClick?: () => void;
}

function HierarchicalSelectItem({
  option,
  setHoveredPosition,
  setChildOpts,
  onClick,
}: IHierarchicalSelectItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);

  function handleMouseEnter() {
    if (itemRef.current && option.childOpts) {
      const rect = itemRef.current.getBoundingClientRect();
      setHoveredPosition?.({
        top: rect.top,
        left: rect.left,
        width: rect.width,
      });
      setChildOpts?.(option.childOpts);
    }
  }

  return (
    <li
      ref={itemRef}
      onMouseEnter={option.childOpts ? handleMouseEnter : undefined}
      className="pointer-events-auto hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2"
      onClick={onClick}
    >
      <span title={option.name} className="truncate flex-1">
        {option.name}
      </span>
      {option.childOpts && <ChevronRight className="size-4" />}
    </li>
  );
}

interface IHierarchicalSelectProps {
  options: HierarchicalOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function HierarchicalSelect({
  options,
  value,
  onValueChange,
}: IHierarchicalSelectProps) {
  const buttonSelectRef = useRef<HTMLButtonElement>(null);
  const parentListOptionRef = useRef<HTMLUListElement>(null);
  const childListOptionRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [btnSelectPosition, setBtnSelectPosition] = useState<PositionType>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [hoveredOptionPosition, setHoveredOptionPosition] = useState<
    PositionType | undefined
  >();
  const [childOpts, setChildOpts] = useState<HierarchicalOption[]>([]);
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
    setHoveredOptionPosition(undefined);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickOnParentList = parentListOptionRef.current?.contains(
        event.target as Node
      );
      const isClickOnChildList = childListOptionRef.current?.contains(
        event.target as Node
      );

      if (!isClickOnParentList && !isClickOnChildList) {
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
        className="flex items-center justify-between gap-x-3 min-w-[200px]"
        onClick={togglePortal}
      >
        <span>{selectedOption ? selectedOption.name : "Select value...."}</span>
        <span>
          <ChevronDown className="size-4" />
        </span>
      </Button>
      {open &&
        ReactDOM.createPortal(
          <ul
            ref={parentListOptionRef}
            style={{
              position: "absolute",
              top: btnSelectPosition.top + 4,
              left: btnSelectPosition.left,
              width: btnSelectPosition.width,
            }}
            className="p-2 border rounded-sm shadow z-9999 bg-white pointer-events-auto"
          >
            {options.map((option) => (
              <HierarchicalSelectItem
                key={option.value}
                option={option}
                setHoveredPosition={setHoveredOptionPosition}
                setChildOpts={setChildOpts}
                onClick={() => {
                  setSelectedOption(option);
                  onValueChange?.(option.value);
                  turnOffOptionsPortal();
                }}
              />
            ))}
          </ul>,
          document.body
        )}
      {hoveredOptionPosition &&
        ReactDOM.createPortal(
          <ul
            ref={childListOptionRef}
            id="portal-child-options"
            style={{
              top: hoveredOptionPosition.top,
              left: hoveredOptionPosition.left + btnSelectPosition.width - 8,
              width: btnSelectPosition.width,
            }}
            className="absolute p-2 border rounded-sm shadow z-9999 bg-white pointer-events-auto"
          >
            {childOpts.map((option) => (
              <HierarchicalSelectItem
                key={option.value}
                option={option}
                onClick={() => {
                  setSelectedOption(option);
                  onValueChange?.(option.value);
                  turnOffOptionsPortal();
                }}
              />
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}
