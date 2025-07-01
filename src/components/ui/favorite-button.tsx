import { Button } from "./button";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { addBookmark } from "@/services/bookmarkService";

interface FavoriteButtonProps {
  flightNumber: string;
  isFavorited: boolean;
  onFavorited: (flightNumber: string) => void;
}

export function FavoriteButton({
  flightNumber,
  isFavorited,
  onFavorited,
}: FavoriteButtonProps) {
  const [disabled, setDisabled] = useState(isFavorited);

  useEffect(() => {
    setDisabled(isFavorited);
  }, [isFavorited]);

  const handleBookmark = async () => {
    try {
      await addBookmark(flightNumber);
      setDisabled(true);
      onFavorited(flightNumber);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  return (
    <Button
      onClick={handleBookmark}
      disabled={disabled}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1"
      size="sm"
    >
      <Star className="w-4 h-4 mr-1" />
      {disabled ? "Adicionado" : "Favoritar"}
    </Button>
  );
}
