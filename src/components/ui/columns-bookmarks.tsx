import { Flight } from "@/types/flight";
import { ColumnDef } from "@tanstack/react-table";
import RemoveButton from "./remove-button";
import { FavoriteButton } from "./favorite-button";
import { RemovedFlight } from "@/types/removed-flights";

interface ColumnsParams {
  onRemove: (flightNumber: string) => void;
  onFavorited: (flightNumber: string) => void;
}

export function getColumnsBookmark({ onRemove, onFavorited }: ColumnsParams): ColumnDef<Flight | RemovedFlight>[] {
  
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
      cell: ({ row }) => (row.original as RemovedFlight).isRemoved ? (
        <FavoriteButton
          flightNumber={row.original.flightNumber}
          isFavorited={false}
          onFavorited={() => onFavorited(row.original.flightNumber)}
        />
      ) : (
        <RemoveButton
          flightNumber={row.original.flightNumber}
          onRemove={onRemove}
        />
      ),
      enableSorting: false,
    }
  ];
}
