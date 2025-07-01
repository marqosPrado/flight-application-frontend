import { ColumnDef } from "@tanstack/react-table";
import { FavoriteButton } from "./favorite-button";

interface ColumnsParams {
  favoriteFlights: Set<string>;
  onFavorited: (flightNumber: string) => void;
}

export function getColumns({ favoriteFlights, onFavorited }: ColumnsParams): ColumnDef<Flight>[] {
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
      id: "favorite",
      header: "Favoritar",
      cell: ({ row }) => (
        <FavoriteButton
          flightNumber={row.original.flightNumber}
          isFavorited={favoriteFlights.has(row.original.flightNumber)}
          onFavorited={onFavorited}
        />
      ),
      enableSorting: false,
    },
  ];
}
