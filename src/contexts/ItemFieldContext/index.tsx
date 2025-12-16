/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext } from "react";
import type { FieldArrayMethodProps } from "react-hook-form";

type CallBackAppend = (value: unknown, option?: any) => void;
type CallBackInsert = (
  index: number,
  value: unknown,
  options?: FieldArrayMethodProps | undefined
) => void;

interface IItemFieldContext {
  append?: CallBackAppend;
  insert?: CallBackInsert;
  copy?: (index: number) => void;
  remove?: (index: number) => void;
}

export const ItemFieldContext = createContext<IItemFieldContext | null>(null);

export function useItemFieldContext() {
  const ctx = useContext(ItemFieldContext);
  if (!ctx)
    throw new Error("useItemFieldContext must be used in ItemFieldProvider.");
  return ctx;
}
