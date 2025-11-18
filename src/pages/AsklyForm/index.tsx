import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import CustomField from "./CustomField";
import PageItem from "./PageItem";

const initialCustomFieldValue = {
  question: "",
  isRequired: false,
  fieldType: "",
};

const AsklyFormSchema = Yup.object().shape({
  customFields: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required!"),
      isRequired: Yup.boolean(),
      fieldType: Yup.string().required("Field type is required!"),
      min: Yup.number(),
      max: Yup.number().when(
        ["fieldType", "min"],
        ([fieldType, min], schema) => {
          return min && fieldType === "number"
            ? schema.min(min, `Max value must be greater than ${min}`)
            : schema;
        }
      ),
      minLength: Yup.number(),
      maxLength: Yup.number().when(
        ["fieldType", "minLength"],
        ([fieldType, minLength], schema) => {
          return minLength && fieldType === "string"
            ? schema.min(
                minLength,
                `Max length must be greater than ${minLength}`
              )
            : schema;
        }
      ),
      length: Yup.number(),
      listOptions: Yup.string(),
      maxSelectedItems: Yup.number(),
      format: Yup.string(),
      isMultipleFiles: Yup.boolean(),
      maxFileSize: Yup.number(),
    })
  ),
});

type AsklyFormDataType = Yup.InferType<typeof AsklyFormSchema>;

export default function AsklyForm() {
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(AsklyFormSchema),
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "customFields",
  });

  function handleAppendCustomField() {
    append(initialCustomFieldValue);
  }

  function onSubmit(data: AsklyFormDataType) {
    console.log("data: ", data);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over?.id);
      swap(oldIndex, newIndex);
    }
  }

  return (
    <div className="flex h-[calc(100%-57px)] ">
      <div className="flex flex-col border-r">
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="flex items-center flex-col">
            <PageItem />
            <span>Page 1</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <Button size={"sm"} variant={"outline"}>
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <Button onClick={handleAppendCustomField}>
          <Plus /> Add Field
        </Button>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((item, index) => (
              <CustomField
                key={item.id}
                control={control}
                watch={watch}
                index={index}
                id={item.id}
                remove={remove}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
