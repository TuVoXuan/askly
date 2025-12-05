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
import { EItemField } from "@/types/enum";
import TitleField from "./TitleField";
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

  function handleAppendItemField(type: string) {
    if (type === EItemField.CUSTOM_FIELD) {
      addItemField({
        type: EItemField.CUSTOM_FIELD,
        customField: {
          question: "",
          isRequired: false,
          fieldType: "",
        },
      });
    } else {
      addItemField({
        type: EItemField.TITLE_FIELD,
        titleField: {
          title: "",
          description: "",
        },
      });
    }
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
      <Button onClick={() => handleAppendItemField(EItemField.CUSTOM_FIELD)}>
        <Plus /> Add Field
      </Button>
      <Button onClick={() => handleAppendItemField(EItemField.TITLE_FIELD)}>
        <Plus /> Add Title Field
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
          {itemFields.map((item, index) => {
            const typeWatch = watch(
              `pages.${pageIndex}.itemFields.${index}.type`
            );
            if (typeWatch === EItemField.CUSTOM_FIELD) {
              return (
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
              );
            }
            return (
              <TitleField
                key={item.id}
                control={control}
                id={item.id}
                index={index}
                onRemove={removeItemField}
                watch={watch}
                baseName={`pages.${pageIndex}.itemFields`}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </>
  );
}
