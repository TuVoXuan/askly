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
import { Plus } from "lucide-react";
import CustomField from "./CustomField";
import { useFieldArray, useFormContext } from "react-hook-form";
import { cloneDeep } from "lodash";
interface Props {
  pageIndex: number;
  show?: boolean;
}

export default function CustomFieldList({ pageIndex, show }: Props) {
  const { control, watch, getValues } = useFormContext();

  const {
    fields: customFields,
    append: addCustomField,
    remove: removeCustomField,
    swap: swapCustomField,
    insert: insertCustomField,
  } = useFieldArray({
    control,
    name: `pages.${pageIndex}.itemFields`,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = customFields.findIndex((item) => item.id === active.id);
      const newIndex = customFields.findIndex((item) => item.id === over?.id);
      swapCustomField(oldIndex, newIndex);
    }
  }

  function handleAppendCustomField() {
    addCustomField({
      question: "",
      isRequired: false,
      fieldType: "",
    });
  }

  function handleCopyCustomField(index: number) {
    const fieldToCopy = cloneDeep(
      getValues(`pages.${pageIndex}.itemFields.${index}`)
    );
    insertCustomField(index + 1, fieldToCopy);
  }

  if (!show) return null;

  return (
    <>
      <Button onClick={handleAppendCustomField}>
        <Plus /> Add Field
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={customFields}
          strategy={verticalListSortingStrategy}
        >
          {customFields.map((item, index) => (
            <CustomField
              key={item.id}
              control={control}
              watch={watch}
              index={index}
              id={item.id}
              onRemove={removeCustomField}
              onCopy={handleCopyCustomField}
              baseName={`pages.${pageIndex}.itemFields`}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
