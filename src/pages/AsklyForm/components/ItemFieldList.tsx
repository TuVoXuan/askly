import { ItemFieldContext } from "@/contexts/ItemFieldContext";
import { EItemField } from "@/types/enum";
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
import { useFieldArray, useFormContext } from "react-hook-form";
import CustomField from "./CustomField";
import TitleField from "./TitleField";
import { cloneDeep } from "lodash";

interface Props {
  pageIndex: number;
  show?: boolean;
  activeItemField?: string;
  onSetActiveItemField: (id: string) => void;
}

export default function ItemFieldList({
  pageIndex,
  show,
  activeItemField,
  onSetActiveItemField,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { control, watch, getValues } = useFormContext();

  const {
    fields: itemFields,
    append,
    remove: removeItemField,
    swap: swapItemField,
    insert: insertItemField,
  } = useFieldArray({
    control,
    name: `pages.${pageIndex}.itemFields`,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = itemFields.findIndex((item) => item.id === active.id);
      const newIndex = itemFields.findIndex((item) => item.id === over?.id);
      swapItemField(oldIndex, newIndex);
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
      <ItemFieldContext.Provider
        value={{
          append,
          insert: insertItemField,
          copy: handleCopyCustomField,
          remove: removeItemField,
        }}
      >
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
                    baseName={`pages.${pageIndex}.itemFields`}
                    onSetActiveItemField={onSetActiveItemField}
                    activeItemField={activeItemField}
                  />
                );
              }
              return (
                <TitleField
                  key={item.id}
                  control={control}
                  id={item.id}
                  index={index}
                  watch={watch}
                  baseName={`pages.${pageIndex}.itemFields`}
                  onSetActiveItemField={onSetActiveItemField}
                  activeItemField={activeItemField}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </ItemFieldContext.Provider>
    </>
  );
}
