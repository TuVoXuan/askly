/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { EFieldType } from "@/types/enum";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CircleQuestionMark, Copy, GripHorizontal, Trash2 } from "lucide-react";
import moment from "moment";
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
  { label: "MMM DD, YYYY HH:mm", value: "MMM DD, YYYY HH:mm" },
  { label: "DD/MM/YYYY HH:mm", value: "DD/MM/YYYY HH:mm" },
];

interface ICustomFieldProps {
  control: any;
  watch: any;
  index: number;
  id: string;
  onCopy: (index: number) => void;
  onRemove: (index: number) => void;
  // baseName is the path prefix for the field array, e.g. "pages.0.customFields".
  // Default kept as "customFields" for backward compatibility.
  baseName?: string;
}

export default function CustomField({
  control,
  watch,
  index,
  id,
  onCopy,
  onRemove,
  baseName = "customFields",
}: ICustomFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fieldTypeWatch = watch(`${baseName}.${index}.customField.fieldType`);
  const lengthWatch = watch(`${baseName}.${index}.customField.length`);
  const minLengthWatch = watch(`${baseName}.${index}.customField.minLength`);
  const maxLengthWatch = watch(`${baseName}.${index}.customField.maxLength`);
  const formatWatch = watch(`${baseName}.${index}.customField.format`);

  function renderFieldType(fieldType: string) {
    switch (fieldType) {
      case EFieldType.NUMBER:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.min`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Min:</span>
                  <Input
                    containerClassName="col-span-9"
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
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Max:</span>
                  <Input
                    containerClassName="col-span-9"
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
          </>
        );
      case EFieldType.STRING:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.length`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Length:</span>
                  <Input
                    containerClassName="col-span-9"
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

            <Controller
              control={control}
              name={`${baseName}.${index}.customField.minLength`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Min length:</span>
                  <Input
                    containerClassName="col-span-9"
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
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Max length:</span>
                  <Input
                    containerClassName="col-span-9"
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
          </>
        );
      case EFieldType.DATE:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Date format:</span>
                  <div className="flex items-center gap-x-3 col-span-9">
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
          </>
        );
      case EFieldType.DATE_TIME:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Date format:</span>
                  <div className="flex items-center gap-x-3 col-span-9">
                    <div>
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger
                          className="w-[180px]"
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
          </>
        );
      case EFieldType.DATE_RANGE:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.format`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Date format:</span>
                  <div className="flex items-center gap-x-3 col-span-9">
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
          </>
        );
      case EFieldType.FILE:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.isMultipleFiles`}
              render={({ field: { value, onChange } }) => (
                <div className="grid grid-cols-12">
                  <Label
                    htmlFor={`${baseName}.${index}.customField.isMultipleFiles`}
                    className="col-span-3 font-normal text-base"
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
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Max File size:</span>
                  <div className="flex items-center gap-x-3 col-span-9">
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
          </>
        );
      case EFieldType.IMAGE:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.isMultipleFiles`}
              render={({ field: { value, onChange } }) => (
                <div className="grid grid-cols-12">
                  <Label
                    htmlFor={`${baseName}.${index}.customField.isMultipleFiles`}
                    className="col-span-3 font-normal text-base"
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
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Max File size:</span>
                  <div className="flex items-center gap-x-3 col-span-9">
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
          </>
        );
      case EFieldType.CHECKBOX:
        return (
          <>
            <Controller
              control={control}
              name={`${baseName}.${index}.customField.listOptions`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">List options:</span>
                  <div className="col-span-9">
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
                <div className="grid grid-cols-12">
                  <span className="col-span-3">Max selected items:</span>
                  <Input
                    containerClassName="col-span-9"
                    className="w-[200px]"
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
              name={`${baseName}.${index}.customField.listOptions`}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="grid grid-cols-12">
                  <span className="col-span-3">List options:</span>
                  <div className="col-span-9">
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
          </>
        );
      default:
        break;
    }
  }

  return (
    <div
      style={style}
      className="rounded-sm border py-2 px-3 space-y-3 w-[700px] bg-white"
    >
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
        name={`${baseName}.${index}.customField.question`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="grid grid-cols-12">
            <span className="col-span-3">Question:</span>
            <div className="col-span-9">
              <Textarea
                rows={1}
                value={value}
                onChange={onChange}
                className="w-[500px]"
                placeholder="Enter question"
                error={!!error?.message}
              />
              {error?.message && (
                <p className="mt-1 text-xs text-red-400">{error.message}</p>
              )}
            </div>
          </div>
        )}
      />

      <Controller
        control={control}
        name={`${baseName}.${index}.customField.fieldType`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="grid grid-cols-12">
            <span className="col-span-3">Field type:</span>
            <div className="col-span-9">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[200px]" error={!!error?.message}>
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
          </div>
        )}
      />

      {fieldTypeWatch && renderFieldType(fieldTypeWatch)}
      <Separator orientation="horizontal" />
      <div className="flex justify-end items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon-lg"}
              variant={"ghost"}
              className="rounded-full"
              onClick={() => onCopy(index)}
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
              onClick={() => onRemove(index)}
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
