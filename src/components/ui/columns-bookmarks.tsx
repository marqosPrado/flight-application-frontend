import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
import { Trash2 } from "lucide-react";

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
      cell: ({ row }) => {
        // Estado local para abrir/fechar diálogo deste item
        const [open, setOpen] = useState(false);

        function handleConfirm() {
          onRemove(row.original.flightNumber);
          setOpen(false);
        }

        return (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remover
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmação de remoção</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover este voo dos favoritos? Essa ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Remover</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
      enableSorting: false,
    },
  ];
}
