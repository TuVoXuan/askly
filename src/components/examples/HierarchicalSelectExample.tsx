import HierarchicalSelect from "@/components/ui/hierarchical-select";
import * as React from "react";

/**
 * Example: Hierarchical Select with Child Options
 *
 * This example shows how to use the HierarchicalSelectItem component
 * to create a select with parent-child option relationships.
 */

export function HierarchicalSelectExample() {
  const [selected, setSelected] = React.useState<string>("");

  const options = [
    {
      value: "fruits",
      name: "Fruits",
      childPosition: "right" as const,
      childOpts: [
        { value: "apple", name: "🍎 Apple" },
        { value: "banana", name: "🍌 Banana" },
        { value: "orange", name: "🍊 Orange" },
      ],
    },
    {
      value: "vegetables",
      name: "Vegetables",
      childPosition: "left" as const,
      childOpts: [
        { value: "carrot", name: "🥕 Carrot" },
        { value: "broccoli", name: "🥦 Broccoli" },
        { value: "spinach", name: "🥬 Spinach" },
      ],
    },
    {
      value: "dairy",
      name: "Dairy",
      childPosition: "right" as const,
      childOpts: [
        { value: "milk", name: "🥛 Milk" },
        { value: "cheese", name: "🧀 Cheese" },
        { value: "yogurt", name: "🍶 Yogurt" },
      ],
    },
  ];

  return (
    <div className="w-64">
      <label className="text-sm font-medium mb-2 block">
        Select a Food Item
      </label>

      <HierarchicalSelect
        options={options}
        value={selected}
        onValueChange={setSelected}
      />

      <div className="mt-4 p-3 bg-muted rounded-md">
        <p className="text-sm">
          Selected value:{" "}
          <span className="font-semibold">{selected || "None"}</span>
        </p>
      </div>
    </div>
  );
}
