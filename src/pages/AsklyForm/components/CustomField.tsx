/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/date-picker";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useItemFieldContext } from "@/contexts/ItemFieldContext";
import { cn } from "@/lib/utils";
import { EFieldType, EItemField } from "@/types/enum";
import { toSlug } from "@/utils/String";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CircleQuestionMark,
  Copy,
  GripHorizontal,
  Image,
  Settings,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import ItemFieldActionBar from "./ItemFieldActionBar";
import useFormStore from "@/store/FormStore";

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
  { label: "MMM DD, YYYY HH:mm", value: "MMM DD, YYYY HH:mm" },
  { label: "DD/MM/YYYY HH:mm", value: "DD/MM/YYYY HH:mm" },
];

interface ICustomFieldProps {
  control: any;
  watch: any;
  index: number;
  id: string;
  activeItemField?: string;
  onSetActiveItemField: (id: string) => void;
  // baseName is the path prefix for the field array, e.g. "pages.0.customFields".
  // Default kept as "customFields" for backward compatibility.
  baseName?: string;
}

export default function CustomField({
  control,
  watch,
  index,
  id,
  activeItemField,
  onSetActiveItemField,
  baseName = "customFields",
}: ICustomFieldProps) {
  const { config } = useFormStore();
  const { copy, remove } = useItemFieldContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const isActive = useMemo(() => activeItemField === id, [activeItemField, id]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fieldTypeWatch = watch(`${baseName}.${index}.customField.fieldType`);
  const lengthWatch = watch(`${baseName}.${index}.customField.length`);
  const minLengthWatch = watch(`${baseName}.${index}.customField.minLength`);
  const maxLengthWatch = watch(`${baseName}.${index}.customField.maxLength`);
  const formatWatch = watch(`${baseName}.${index}.customField.format`);
  const listOptionsWatch = watch(
    `${baseName}.${index}.customField.listOptions`
  );

  function renderFieldType(fieldType: string) {
    switch (fieldType) {
      case EFieldType.NUMBER:
        return (
          <>
            <Input
              type="number"
              disabled
              placeholder="type answer here..."
              className="w-[200px]"
            />
            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <div className="grid grid-cols-2">
                <Controller
                  control={control}
                  name={`${baseName}.${index}.customField.min`}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <span className="w-[138px]">Min:</span>
                      <Input
                        className="w-[200px]"
                        type="number"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                        placeholder="Enter value"
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`${baseName}.${index}.customField.max`}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <span className="w-[138px]">Max:</span>
                      <Input
                        className="w-[200px]"
                        type="number"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                        placeholder="Enter value"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </>
        );
      case EFieldType.STRING:
        return (
          <>
            <Input
              type="number"
              disabled
              placeholder="type answer here..."
              className="w-[200px]"
            />
            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.length`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[138px]">Length:</span>
                    <Input
                      type="number"
                      className="w-[200px]"
                      value={value}
                      onChange={onChange}
                      helperText={error?.message}
                      disabled={!!minLengthWatch || !!maxLengthWatch}
                      placeholder="Enter value"
                    />
                  </div>
                )}
              />
              <div className="grid grid-cols-2">
                <Controller
                  control={control}
                  name={`${baseName}.${index}.customField.minLength`}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <span className="w-[138px]">Min length:</span>
                      <Input
                        type="number"
                        className="w-[200px]"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                        disabled={!!lengthWatch}
                        placeholder="Enter value"
                      />
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`${baseName}.${index}.customField.maxLength`}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <span className="w-[138px]">Max length:</span>
                      <Input
                        type="number"
                        className="w-[200px]"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                        disabled={!!lengthWatch}
                        placeholder="Enter value"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </>
        );
      case EFieldType.DATE:
        return (
          <>
            <div>
              <DatePicker disabled />
            </div>

            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.format`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[138px]">Date format:</span>
                    <div className="flex items-center gap-x-3">
                      <div>
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger
                            className="w-[200px]"
                            error={!!error?.message}
                          >
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
                      {formatWatch && (
                        <span className="text-black/50">
                          ex: {moment(new Date()).format(formatWatch)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </>
        );
      case EFieldType.DATE_TIME:
        return (
          <>
            <div>
              <DatePicker disabled />
            </div>

            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.format`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[138px]">Date format:</span>
                    <div className="flex items-center gap-x-3">
                      <div>
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger
                            className="w-[220px]"
                            error={!!error?.message}
                          >
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
                      {formatWatch && (
                        <span className="text-black/50">
                          ex: {moment(new Date()).format(formatWatch)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </>
        );
      case EFieldType.DATE_RANGE:
        return (
          <>
            <div>
              <DatePicker mode="range" disabled />
            </div>

            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.format`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[138px]">Date format:</span>
                    <div className="flex items-center gap-x-3">
                      <div>
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger
                            className="w-[180px]"
                            error={!!error?.message}
                          >
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
                      {formatWatch && (
                        <span className="text-black/50">
                          ex: {moment(new Date()).format(formatWatch)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
          </>
        );
      case EFieldType.FILE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <Button disabled>Upload file</Button>
              <Input placeholder="file-name" disabled />
            </div>
            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.isMultipleFiles`}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center">
                    <Label
                      htmlFor={`${baseName}.${index}.customField.isMultipleFiles`}
                      className="w-[150px] font-normal text-base"
                    >
                      Multiple files:
                    </Label>
                    <Switch
                      id={`${baseName}.${index}.customField.isMultipleFiles`}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                  </div>
                )}
              />

              <Controller
                control={control}
                name={`${baseName}.${index}.customField.maxFileSize`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[150px]">Max File size:</span>
                    <div className="flex items-center gap-x-3">
                      <Input
                        className="w-[200px]"
                        type="number"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                      />
                      MB
                    </div>
                  </div>
                )}
              />
            </div>
          </>
        );
      case EFieldType.IMAGE:
        return (
          <>
            <div className="flex items-center gap-x-2">
              <Button disabled>Upload file</Button>
              <Input placeholder="file-name" disabled />
            </div>
            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>

              <Controller
                control={control}
                name={`${baseName}.${index}.customField.isMultipleFiles`}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center">
                    <Label
                      htmlFor={`${baseName}.${index}.customField.isMultipleFiles`}
                      className="w-[150px] font-normal text-base"
                    >
                      Multiple files:
                    </Label>
                    <Switch
                      id={`${baseName}.${index}.customField.isMultipleFiles`}
                      checked={value}
                      onCheckedChange={onChange}
                    />
                  </div>
                )}
              />

              <Controller
                control={control}
                name={`${baseName}.${index}.customField.maxFileSize`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[150px]">Max File size:</span>
                    <div className="flex items-center gap-x-3">
                      <Input
                        className="w-[200px]"
                        type="number"
                        value={value}
                        onChange={onChange}
                        helperText={error?.message}
                      />
                      MB
                    </div>
                  </div>
                )}
              />
            </div>
          </>
        );
      case EFieldType.CHECKBOX:
        return (
          <>
            <div className="space-y-2">
              {listOptionsWatch &&
                listOptionsWatch
                  .split("\n")
                  .map((option: string) => option.trim())
                  .filter((option: string) => option.length > 0)
                  .map((option: string, index: number) => (
                    <div
                      key={`${toSlug(option)}_${index}`}
                      className="flex items-center gap-3"
                    >
                      <Checkbox id={toSlug(option)} value={option} />
                      <Label htmlFor={toSlug(option)}>{option}</Label>
                    </div>
                  ))}
            </div>

            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.listOptions`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-start">
                    <span className="w-[150px]">List options:</span>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
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
                name={`${baseName}.${index}.customField.maxSelectedItems`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-center">
                    <span className="w-[150px]">Max selected items:</span>
                    <Input
                      className="w-[200px]"
                      type="number"
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
      case EFieldType.RADIO:
        return (
          <>
            <RadioGroup>
              {listOptionsWatch &&
                listOptionsWatch
                  .split("\n")
                  .map((option: string) => option.trim())
                  .filter((option: string) => option.length > 0)
                  .map((option: string, index: number) => (
                    <div
                      key={`${toSlug(option)}_${index}`}
                      className="flex items-center gap-3"
                    >
                      <RadioGroupItem value={option} id={toSlug(option)} />
                      <Label htmlFor={toSlug(option)}>{option}</Label>
                    </div>
                  ))}
            </RadioGroup>

            <div className="relative p-3 border rounded-sm space-y-3 mt-4">
              <div className="absolute top-0 left-4 -translate-y-1/2 flex items-center gap-x-2 bg-white px-2">
                <Settings className="size-4" />
                <span className="text-sm">Setting field</span>
              </div>
              <Controller
                control={control}
                name={`${baseName}.${index}.customField.listOptions`}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <div className="flex items-start">
                    <span className="w-[150px]">List options:</span>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Option 1\nOption 2\nOption 3\nPress enter to break line to add new option`}
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
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
            </div>
          </>
        );
      default:
        break;
    }
  }

  return (
    <div
      style={style}
      className={cn(
        "relative rounded-sm shadow border py-2 px-3 space-y-3 w-[800px] bg-white",
        isActive && "border-l-[5px] border-l-blue-400"
      )}
      onClick={() => onSetActiveItemField(id)}
    >
      {isActive && (
        <ItemFieldActionBar
          index={index}
          itemFieldType={EItemField.CUSTOM_FIELD}
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

      <div className="grid grid-cols-12">
        <Controller
          control={control}
          name={`${baseName}.${index}.customField.question`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="flex items-start col-span-8">
              <div className="flex-1">
                <Textarea
                  rows={1}
                  value={value}
                  onChange={onChange}
                  className="w-full"
                  placeholder="Enter question"
                  error={!!error?.message}
                  style={{
                    fontSize: config.question.fontSize + "px",
                    fontWeight: config.question.fontWeight,
                  }}
                />
                {error?.message && (
                  <p className="mt-1 text-xs text-red-400">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="col-span-1 rounded-full mx-auto"
              variant={"ghost"}
              size={"icon-lg"}
            >
              <Image className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add image</p>
          </TooltipContent>
        </Tooltip>

        <Controller
          control={control}
          name={`${baseName}.${index}.customField.fieldType`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="col-span-3">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full" error={!!error?.message}>
                  <SelectValue placeholder="Select field type" />
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
          )}
        />
      </div>

      {fieldTypeWatch && renderFieldType(fieldTypeWatch)}
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

        <Separator orientation="vertical" className="h-8! mx-3" />
        <Controller
          control={control}
          name={`${baseName}.${index}.customField.isRequired`}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center gap-x-3">
              <Label
                htmlFor={`customFields.${index}.isRequired`}
                className="col-span-3 font-normal text-base"
              >
                Is required
              </Label>
              <Switch
                id={`customFields.${index}.isRequired`}
                checked={value}
                onCheckedChange={onChange}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
