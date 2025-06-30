"use client";

import { Button } from "./button";
import { useState } from "react";
import { Star } from "lucide-react";
import { addBookmark } from "@/services/bookmarkService";

interface FavoriteButtonProps {
  flightNumber: string;
}

export function FavoriteButton({ flightNumber }: FavoriteButtonProps) {
  const [disabled, setDisabled] = useState(false);

  const handleBookmark = async () => {
    try {
      await addBookmark(flightNumber);
      setDisabled(true);
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