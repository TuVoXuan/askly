import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EFieldType } from "@/types/enum";
import {
  ChevronLeft,
  ChevronRight,
  Equal,
  CircleQuestionMark,
} from "lucide-react";
import { useState } from "react";

const FieldTypeOptions = [
  { label: "Number", value: EFieldType.NUMBER },
  { label: "String", value: EFieldType.STRING },
  { label: "Date", value: EFieldType.DATE },
  { label: "Date time", value: EFieldType.DATE_TIME },
  { label: "Date range", value: EFieldType.DATE_RANGE },
  { label: "Checkbox", value: EFieldType.CHECKBOX },
  { label: "Radio", value: EFieldType.RADIO },
  { label: "File", value: EFieldType.FILE },
  { label: "Image", value: EFieldType.IMAGE },
];

const DateFormatOptions = [
  { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "MMM DD, YYYY", value: "MMM DD, YYYY" },
  { label: "MMMM DD, YYYY", value: "MMMM DD, YYYY" },
];

const DateTimeFormatOptions = [
  { label: "MMM DD, YYYY at HH:mm", value: "MMM DD, YYYY at HH:mm" },
  { label: "DD/MM/YYYY HH:mm", value: "DD/MM/YYYY HH:mm" },
];

export default function CustomField() {
  const [selectedFieldType, setSelectedFieldType] = useState<string>();

  function renderFieldType(fieldType: string) {
    switch (fieldType) {
      case EFieldType.NUMBER:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Min:</span>
              <Input type="number" />
            </div>
            <div className="flex items-center gap-x-2">
              <span>Max:</span>
              <Input type="number" />
            </div>
            <div className="flex items-center gap-x-2">
              <span>Is dependent on:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select dependent field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* Map the input should depend on here */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Compare:</span>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                size="sm"
              >
                <ToggleGroupItem value="lt" aria-label="Less than">
                  <ChevronLeft />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="lte"
                  aria-label="Less than equal"
                  className="gap-x-0"
                >
                  <ChevronLeft />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="gte"
                  aria-label="Greater than equal"
                  className="gap-x-0"
                >
                  <ChevronRight />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem value="gt" aria-label="Greater than">
                  <ChevronRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </>
        );
      case EFieldType.STRING:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>String type:</span>
              <RadioGroup className="flex gap-x-2">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="email" id="type_email" />
                  <Label htmlFor="type_email">Email</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="text" id="type_text" />
                  <Label htmlFor="type_text">Text</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <span>Length:</span>
                <Input type="number" className="w-[100px]" />
              </div>
              <Separator orientation="vertical" className="h-6!" />
              <div className="flex items-center gap-x-2">
                <span>Min length:</span>
                <Input type="number" className="w-[100px]" />
              </div>
              <div className="flex items-center gap-x-2">
                <span>Max length:</span>
                <Input type="number" className="w-[100px]" />
              </div>
            </div>
          </>
        );
      case EFieldType.DATE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Is dependent on:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select dependent field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* Map the input should depend on here */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Compare:</span>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                size="sm"
              >
                <ToggleGroupItem value="lt" aria-label="Less than">
                  <ChevronLeft />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="lte"
                  aria-label="Less than equal"
                  className="gap-x-0"
                >
                  <ChevronLeft />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="gte"
                  aria-label="Greater than equal"
                  className="gap-x-0"
                >
                  <ChevronRight />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem value="gt" aria-label="Greater than">
                  <ChevronRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Date format:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {DateFormatOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-black/60" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This format will use to display date follow selected format
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="text-black/50">
                show example with the selected format here{" "}
              </span>
            </div>
          </>
        );
      case EFieldType.DATE_TIME:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Is dependent on:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select dependent field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* Map the input should depend on here */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Compare:</span>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={2}
                size="sm"
              >
                <ToggleGroupItem value="lt" aria-label="Less than">
                  <ChevronLeft />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="lte"
                  aria-label="Less than equal"
                  className="gap-x-0"
                >
                  <ChevronLeft />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="gte"
                  aria-label="Greater than equal"
                  className="gap-x-0"
                >
                  <ChevronRight />
                  <Equal />
                </ToggleGroupItem>
                <ToggleGroupItem value="gt" aria-label="Greater than">
                  <ChevronRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex items-center gap-x-2">
              <span>Date format:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date time format" />
                </SelectTrigger>
                <SelectContent>
                  {DateTimeFormatOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-black/60" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This format will use to display date time follow selected
                    format
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="text-black/50">
                show example with the selected format here{" "}
              </span>
            </div>
          </>
        );
      case EFieldType.DATE_RANGE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Date format:</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {DateFormatOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-black/60" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This format will use to display date follow selected format
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="text-black/50">
                show example with the selected format here
              </span>
            </div>
          </>
        );
      case EFieldType.FILE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Multiple files:</span>
              <Checkbox />
            </div>
            <div className="flex items-center gap-x-2">
              <span>Max File size:</span>
              <Input type="number" />
              MB
            </div>
          </>
        );
      case EFieldType.IMAGE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <span>Multiple files:</span>
              <Checkbox />
            </div>
            <div className="flex items-center gap-x-2">
              <span>Max File size:</span>
              <Input type="number" />
              MB
            </div>
          </>
        );
      case EFieldType.CHECKBOX:
        return (
          <>
            <div className="flex items-start gap-x-2">
              <span className="shrink-0">List options:</span>
              <Textarea
                placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
              />
            </div>
            <div className="flex items-start gap-x-2">
              <span className="shrink-0">Max selected items:</span>
              <Input type="number" />
            </div>
          </>
        );
      case EFieldType.RADIO:
        return (
          <>
            <div className="flex items-start gap-x-2">
              <span className="shrink-0">List options:</span>
              <Textarea
                placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
              />
            </div>
          </>
        );
      default:
        break;
    }
  }

  return (
    <div className="rounded-sm border py-2 px-3 space-y-3 w-fit">
      <div className="flex items-start gap-x-2">
        <span>Question:</span>
        <Textarea rows={1} className="w-[500px]" />
      </div>
      <div className="flex items-center gap-x-2">
        <span>Field type:</span>
        <Select value={selectedFieldType} onValueChange={setSelectedFieldType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {FieldTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-x-2">
        <span>Is Required:</span>
        <Checkbox />
      </div>
      {selectedFieldType && renderFieldType(selectedFieldType)}
    </div>
  );
}
