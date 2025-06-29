import { ColumnDef } from "@tanstack/react-table";

export type Flight = {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  price: string;
};

export const columns: ColumnDef<Flight>[] = [
  {
    accessorKey: "flightNumber",
    header: "Nº do Voo",
  },
  {
    accessorKey: "airline",
    header: "Companhia",
  },
  {
    accessorKey: "origin",
    header: "Origem",
  },
  {
    accessorKey: "destination",
    header: "Destino",
  },
  {
    accessorKey: "departure",
    header: "Partida",
    cell: ({ row }) => {
      const date = new Date(row.original.departure);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "arrival",
    header: "Chegada",
    cell: ({ row }) => {
      const date = new Date(row.original.arrival);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => `R$ ${row.original.price}`,
  },
];
