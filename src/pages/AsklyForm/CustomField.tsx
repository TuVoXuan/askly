/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  CircleQuestionMark,
  Equal,
} from "lucide-react";
import { Controller } from "react-hook-form";

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

interface ICustomFieldProps {
  control: any;
  watch: any;
  index: number;
}

export default function CustomField({
  control,
  watch,
  index,
}: ICustomFieldProps) {
  const fieldTypeWatch = watch(`customFields.${index}.fieldType`);

  function renderFieldType(fieldType: string) {
    switch (fieldType) {
      case EFieldType.NUMBER:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.min`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Min:</span>
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    helperText={error?.message}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.max`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Max:</span>
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    helperText={error?.message}
                  />
                </div>
              )}
            />

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
            <Controller
              control={control}
              name={`customFields.${index}.compare`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Compare:</span>
                  <div>
                    <ToggleGroup
                      value={value}
                      onValueChange={onChange}
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />
          </>
        );
      case EFieldType.STRING:
        return (
          <>
            <div className="flex items-center gap-x-4">
              <Controller
                control={control}
                name={`customFields.${index}.length`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center gap-x-2">
                    <span>Length:</span>
                    <Input
                      type="number"
                      className="w-[100px]"
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                    />
                  </div>
                )}
              />

              <Separator orientation="vertical" className="h-6!" />
              <Controller
                control={control}
                name={`customFields.${index}.minLength`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center gap-x-2">
                    <span>Min length:</span>
                    <Input
                      type="number"
                      className="w-[100px]"
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name={`customFields.${index}.maxLength`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center gap-x-2">
                    <span>Max length:</span>
                    <Input
                      type="number"
                      className="w-[100px]"
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                    />
                  </div>
                )}
              />
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

            <Controller
              control={control}
              name={`customFields.${index}.compare`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Compare:</span>
                  <div>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      spacing={2}
                      size="sm"
                      value={value}
                      onValueChange={onChange}
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Date format:</span>
                  <div>
                    <Select value={value} onValueChange={onChange}>
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-black/60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This format will use to display date follow selected
                        format
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-black/50">
                    show example with the selected format here{" "}
                  </span>
                </div>
              )}
            />
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

            <Controller
              control={control}
              name={`customFields.${index}.compare`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Compare:</span>
                  <div>
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      spacing={2}
                      size="sm"
                      value={value}
                      onValueChange={onChange}
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Date format:</span>
                  <div>
                    <Select value={value} onValueChange={onChange}>
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-black/60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This format will use to display date time follow
                        selected format
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-black/50">
                    show example with the selected format here{" "}
                  </span>
                </div>
              )}
            />
          </>
        );
      case EFieldType.DATE_RANGE:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Date format:</span>
                  <div>
                    <Select value={value} onValueChange={onChange}>
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
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-black/60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This format will use to display date follow selected
                        format
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-black/50">
                    show example with the selected format here
                  </span>
                </div>
              )}
            />
          </>
        );
      case EFieldType.FILE:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.isMultipleFiles`}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center gap-x-2">
                  <span>Multiple files:</span>
                  <Checkbox checked={value} onCheckedChange={onChange} />
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.maxFileSize`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Max File size:</span>
                  <div>
                    <Input type="number" value={value} onChange={onChange} />
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                  MB
                </div>
              )}
            />
          </>
        );
      case EFieldType.IMAGE:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.isMultipleFiles`}
              render={({ field: { value, onChange } }) => (
                <div className="flex items-center gap-x-2">
                  <span>Multiple files:</span>
                  <Checkbox checked={value} onCheckedChange={onChange} />
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.maxFileSize`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-center gap-x-2">
                  <span>Max File size:</span>
                  <div>
                    <Input type="number" value={value} onChange={onChange} />
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                  MB
                </div>
              )}
            />
          </>
        );
      case EFieldType.CHECKBOX:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.listOptions`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-start gap-x-2">
                  <span className="shrink-0">List options:</span>
                  <div>
                    <Textarea
                      placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
                      value={value}
                      onChange={onChange}
                    />
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />

            <Controller
              control={control}
              name={`customFields.${index}.maxSelectedItems`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-start gap-x-2">
                  <span className="shrink-0">Max selected items:</span>
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    helperText={error?.message}
                  />
                </div>
              )}
            />
          </>
        );
      case EFieldType.RADIO:
        return (
          <>
            <Controller
              control={control}
              name={`customFields.${index}.listOptions`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="flex items-start gap-x-2">
                  <span className="shrink-0">List options:</span>
                  <div>
                    <Textarea
                      placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
                      value={value}
                      onChange={onChange}
                    />
                    {error?.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {error.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />
          </>
        );
      default:
        break;
    }
  }

  return (
    <div className="rounded-sm border py-2 px-3 space-y-3 w-fit">
      <Controller
        control={control}
        name={`customFields.${index}.question`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="flex items-start gap-x-2">
            <span>Question:</span>
            <div>
              <Textarea
                rows={1}
                className="w-[500px]"
                value={value}
                onChange={onChange}
              />
              {error?.message && (
                <p className="mt-1 text-xs text-red-400">{error.message}</p>
              )}
            </div>
          </div>
        )}
      />

      <div className="flex gap-x-10">
        <Controller
          control={control}
          name={`customFields.${index}.fieldType`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="flex items-center gap-x-2">
              <span>Field type:</span>
              <div>
                <Select value={value} onValueChange={onChange}>
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
                {error?.message && (
                  <p className="mt-1 text-xs text-red-400">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />

        <Controller
          control={control}
          name={`customFields.${control}.isRequired`}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center gap-x-2">
              <span>Is Required:</span>
              <Checkbox checked={value} onCheckedChange={onChange} />
            </div>
          )}
        />
      </div>

      {fieldTypeWatch && renderFieldType(fieldTypeWatch)}
    </div>
  );
}
