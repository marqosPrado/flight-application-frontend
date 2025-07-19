import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader, AlertDialogFooter } from "./alert-dialog";

interface RemoveButtonProps {
  flightNumber: string;
  onRemove: (flightNumber: string) => void;
}

function RemoveButton({ flightNumber, onRemove }: RemoveButtonProps) {

  function handleConfirm() {
    onRemove(flightNumber);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1"
          size="sm"
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
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Remover</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveButton;
