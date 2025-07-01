import { Flight } from "@/types/flight";
import { ColumnDef } from "@tanstack/react-table";
import RemoveButton from "./remove-button";

interface ColumnsParams {
  onRemove: (flightNumber: string) => void;
}

export function getColumnsBookmark({ onRemove }: ColumnsParams): ColumnDef<Flight>[] {
  return [
    { accessorKey: "flightNumber", header: "Nº do Voo" },
    { accessorKey: "airline", header: "Companhia" },
    { accessorKey: "origin", header: "Origem" },
    { accessorKey: "destination", header: "Destino" },
    {
      accessorKey: "departure",
      header: "Partida",
      cell: ({ row }) => new Date(row.original.departure).toLocaleString(),
    },
    {
      accessorKey: "arrival",
      header: "Chegada",
      cell: ({ row }) => new Date(row.original.arrival).toLocaleString(),
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => `R$ ${row.original.price}`,
    },
    {
      id: "remove",
      header: "Remover",
      cell: ({ row }) => (
        <RemoveButton
          flightNumber={row.original.flightNumber}
          onRemove={onRemove}
        />
      ),
      enableSorting: false,
    }
  ];
}
