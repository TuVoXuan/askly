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

export default function ItemFieldList({ pageIndex, show }: Props) {
  const { control, watch, getValues } = useFormContext();

  const {
    fields: itemFields,
    append: addItemField,
    remove: removeItemField,
    swap: swapItemField,
    insert: insertItemField,
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
      const oldIndex = itemFields.findIndex((item) => item.id === active.id);
      const newIndex = itemFields.findIndex((item) => item.id === over?.id);
      swapItemField(oldIndex, newIndex);
    }
  }

  function handleAppendCustomField() {
    addItemField({
      question: "",
      isRequired: false,
      fieldType: "",
    });
  }

  function handleCopyCustomField(index: number) {
    const fieldToCopy = cloneDeep(
      getValues(`pages.${pageIndex}.itemFields.${index}`)
    );
    insertItemField(index + 1, fieldToCopy);
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
          items={itemFields}
          strategy={verticalListSortingStrategy}
        >
          {itemFields.map((item, index) => (
            <CustomField
              key={item.id}
              control={control}
              watch={watch}
              index={index}
              id={item.id}
              onRemove={removeItemField}
              onCopy={handleCopyCustomField}
              baseName={`pages.${pageIndex}.itemFields`}
            />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
