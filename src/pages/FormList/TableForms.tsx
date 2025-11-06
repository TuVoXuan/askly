import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PaginationWithLinks } from "@/components/ui/pagination-with-link";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  Copy,
  Link,
  Link2Off,
  Trash,
  PencilLine,
  Eye,
  Plus,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import FilterTableForm from "./FilterTableForm";
import useFilterFormList from "@/hooks/filters/useFilterFormList";

type FormItem = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  numberOfAnswers: number;
};

export default function TableForms() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");
  const { filter, totalFilters, resetFilters, updateFilter } =
    useFilterFormList();
  const columns: ColumnDef<FormItem>[] = [
    {
      accessorKey: "name",
      header: "Form Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "numberOfAnswers",
      header: "Number of Answers",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
    {
      id: "actions",
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link className="h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="h-4 w-4" />
                View Answers
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Link2Off className="h-4 w-4 text-red-500" />
                Unpublish
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash className="h-4 w-4 text-red-500" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PencilLine className="h-4 w-4" />
                Change Name
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fakeData: FormItem[] = [
    {
      id: "1",
      name: "Customer Feedback",
      status: "Active",
      createdAt: "2023-10-01",
      numberOfAnswers: 150,
    },
    {
      id: "2",
      name: "Event Registration",
      status: "Inactive",
      createdAt: "2023-09-15",
      numberOfAnswers: 75,
    },
  ];

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-3">
          <Input placeholder="Search..." className="w-[250px]" />
          <Button>Search</Button>
          <FilterTableForm
            value={filter}
            onApply={updateFilter}
            onReset={resetFilters}
            totalFilters={totalFilters}
          />
        </div>

        <Button variant={"outline"}>
          <Plus className="h-4 w-4" />
          Add New Form
        </Button>
      </div>

      <DataTable columns={columns} data={fakeData} />
      <div className="mt-3">
        <PaginationWithLinks
          page={page}
          pageSize={pageSize}
          totalCount={100}
          pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 30] }}
        />
      </div>
    </div>
  );
}
