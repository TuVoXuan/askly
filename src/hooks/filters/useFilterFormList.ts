/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

export default function useFilterFormList() {
  const [filter, setFilter] = useState<any>({});

  const totalFilters = useMemo(() => {
    return Object.values(filter).reduce((acc: number, value) => {
      if(typeof value === 'string' && value.trim() !== '') {
        return acc + 1;
      }
      return acc;
    }, 0)
  }, [filter]);

  const resetFilters = () => {
    setFilter({});
  }

  const updateFilter = (filters: any) => {
    setFilter(filters);
  }

  return {
    filter,
    updateFilter,
    resetFilters,
    totalFilters
  }
}