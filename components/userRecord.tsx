import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

// 1. Define columns for transaction table

const UserRecord = ({ data, dataClass }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const searchParams = useSearchParams();
  const filterCategory = searchParams.get("category");
  const [categoryFilter, setCategoryFilter] = React.useState(
    filterCategory || "all",
  );
  const [sortBy, setSortBy] = React.useState("latest");

  // // ✅ only runs when data is ready
  const userData = useMemo(() => data || [], [data]);

  console.log(dataClass.classes, "checking classes props");

  const classMap = useMemo(() => {
    const map: Record<number, string> = {};

    if (!dataClass?.classes) return map;

    // Flatten all class arrays from different levels
    Object.values(dataClass.classes)
      .flat()
      .forEach((cls: any) => {
        map[cls.id] = cls.name; // or cls.text depending on API
      });

    return map;
  }, [dataClass]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "created_at",
        header: "Date Added",
        cell: ({ row }) =>
          new Date(row.original.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
      {
        accessorKey: "class_id",
        header: "Class",
        cell: ({ row }) => {
          const classId = row.original.class_id;
          return (
            <span
            // className={
            //   amount < 0
            //     ? "text-red-500 font-medium"
            //     : "text-green-600 font-medium"
            // }
            >
              {classId !== null && classMap[classId]
                ? classMap[classId]
                : "Teacher"}
            </span>
          );
        },
      },
    ],
    [classMap],
  );

  // ✅ Filtering by category and sort logic
  const filteredData = useMemo(() => {
    let filtered = [...(userData || [])];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.role.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }
    return filtered;
  }, [userData, categoryFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // ✅ Get unique categories for dropdown
  const categories = Array.from(new Set(userData.map((t) => t.role)));
  return (
    <div className="w-full bg-beige100 h-full  py-4">
      <h2 className="text-grey900 text-3xl font-bold pb-8">All User Records</h2>
      {/*Filters*/}
      <div className="bg-white p-6 rounded-lg">
        <div className="flex flex-row justify-between pb-8 w-full">
          {/*search filter*/}
          <Input
            placeholder="Search user"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-2/5"
            id="search-input"
          />
          <div className="flex gap-5 items-center">
            <label htmlFor="categoryFilter">Roles Categories</label>
            <Select
              onValueChange={setCategoryFilter}
              defaultValue={categoryFilter}
            >
              <SelectTrigger className="w-40" id="categoryFilter">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-yellow">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`hover:scale-105 transition-all hover:shadow-lg duration-200 ease-in-out cursor-pointer`}
          >
            <ArrowBigLeft className="fill-grey900" />
            Previous
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`hover:scale-105 transition-all hover:shadow-lg duration-200 ease-in-out cursor-pointer`}
          >
            Next
            <ArrowBigRight className="fill-grey900" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRecord;
