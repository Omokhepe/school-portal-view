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
import { ArrowBigLeft, ArrowBigRight, Pencil, Trash } from "lucide-react";
import useAppStore, { UserType } from "@store/appStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  users: UserType[];
  role?: string;
}

const UserRecord = ({ users, role }: Props) => {
  const classes = useAppStore((s) => s.classes);
  const [globalFilter, setGlobalFilter] = useState("");
  const searchParams = useSearchParams();
  const filterCategory = searchParams.get("class_id");
  const [categoryFilter, setCategoryFilter] = React.useState(
    filterCategory || 0,
  );

  // // ✅ only runs when data is ready
  const userData = useMemo(() => users || [], [users]);

  const classMap = useMemo(() => {
    const map: Record<number, string> = {};

    if (!classes) return map;

    // Flatten all class arrays from different levels
    Object.values(classes)
      .flat()
      .forEach((cls: any) => {
        map[cls.id] = cls.name; // or cls.text depending on API
      });

    return map;
  }, [classes]);

  const handleEdit = (user) => {
    console.log(user);
  };
  const handleDelete = (id) => {
    console.log(id);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "user_id",
        header: role === "student" ? "Student ID" : "Teacher ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "username",
        header: "User Name",
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
            <span>
              {classId !== null && classMap[classId]
                ? classMap[classId]
                : "Teacher"}
            </span>
          );
        },
      },
      {
        header: "Actions",
        id: "actions", // custom column (no accessor)
        cell: ({ row }) => {
          const user = row.original; // full row data

          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="px-2 py-1 text-sm text-yellow-900  rounded hover:text-yellow-700"
              >
                <Pencil />
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="px-2 py-1 text-sm text-red-600 border  rounded hover:bg-red-50"
              >
                <Trash />
              </button>
            </div>
          );
        },
      },
    ],
    [classMap],
  );

  // ✅ Filtering by category and sort logic
  const filteredData = useMemo(() => {
    let filtered = [...(userData || [])];

    if (categoryFilter !== 0) {
      filtered = filtered.filter(
        // (item) => item.role.toLowerCase() === categoryFilter.toLowerCase(),
        (item) => item.class_id === categoryFilter,
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
  const categories = Array.from(new Set(userData.map((t) => t.class_id)));
  return (
    <div className="w-3/5 bg-beige100  py-4">
      <h2 className="text-grey900 text-3xl font-bold pb-8">
        All {role === "student" ? "Student" : "Teacher"} Records
      </h2>
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
            <label htmlFor="categoryFilter">Class Categories</label>
            <Select
              onValueChange={setCategoryFilter}
              defaultValue={categoryFilter}
            >
              <SelectTrigger className="w-40" id="categoryFilter">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={0}>All Roles</SelectItem>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {classMap[cat]}
                  </SelectItem>
                ))}
                {/*{classes.map((cat, index) => (*/}
                {/*  <SelectItem key={index} value={cat}>*/}
                {/*    {cat}*/}
                {/*  </SelectItem>*/}
                {/*))}*/}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="table-section">
            {/* -------- Trigger Section: ALWAYS visible -------- */}
            <AccordionTrigger className="no-underline hover:no-underline mx-2">
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
              </Table>
            </AccordionTrigger>

            {/* -------- Content Section: Visible only when expanded -------- */}
            <AccordionContent>
              <Table>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/30 ">
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
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-4"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
