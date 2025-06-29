"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-lg border bg-white">
      <Table className="w-full text-sm text-gray-700">
        <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="px-4 py-3 font-semibold text-gray-800">
                            {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>

        <TableBody>
            {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, idx) => (
                    <TableRow
                        key={row.id}
                        className={`hover:bg-gray-100 ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="px-4 py-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        Nenhum resultado.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  );
}
