import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogHeader, AlertDialogFooter } from "./alert-dialog";

interface RemoveButtonProps {
  flightNumber: string;
  onRemove: (flightNumber: string) => void;
}

function RemoveButton({ flightNumber, onRemove }: RemoveButtonProps) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    onRemove(flightNumber);
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
}

export default RemoveButton;
