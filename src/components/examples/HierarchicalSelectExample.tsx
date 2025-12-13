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
      name: "Fruits hello world today is good",
      childPosition: "right" as const,
      childOpts: [
        { value: "apple", name: "🍎 Apple hello world today is good" },
        { value: "banana", name: "🍌 Banana hello world today is good" },
        { value: "orange", name: "🍊 Orange hello world today is good" },
      ],
    },
    {
      value: "vegetables",
      name: "Vegetables hello world today is good",
      childPosition: "left" as const,
      childOpts: [
        { value: "carrot", name: "🥕 Carrot hello world today is good" },
        { value: "broccoli", name: "🥦 Broccoli hello world today is good" },
        { value: "spinach", name: "🥬 Spinach hello world today is good" },
      ],
    },
    {
      value: "dairy",
      name: "Dairy hello world today is good",
      childPosition: "right" as const,
      childOpts: [
        { value: "milk", name: "🥛 Milk hello world today is good" },
        { value: "cheese", name: "🧀 Cheese hello world today is good" },
        { value: "yogurt", name: "🍶 Yogurt hello world today is good" },
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
        className="w-[210px]"
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
