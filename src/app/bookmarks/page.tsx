"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getBookmarks, removeBookmark } from "@/services/bookmarkService";
import { getColumnsBookmark } from "@/components/ui/columns-bookmarks";
import Header from "@/components/ui/header";

export default function FavoritosPage() {
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    async function fetchFavorites() {
        try {
            const data: Flight[] = await getBookmarks();
            setFlights(data);
        } catch (error) {
            console.error("Erro ao buscar favoritos", error);
        }
    }

    async function handleRemove(flightNumber: string) {
        try {
            await removeBookmark(flightNumber);
            setFlights((prev) => prev.filter((f) => f.flightNumber !== flightNumber));
        } catch (error) {
            console.error("Erro ao remover favorito", error);
        }
    }

    const columns = getColumnsBookmark({ onRemove: handleRemove });

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <div className="container mx-auto py-12">
                <div className="bg-white shadow-md rounded-2xl p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Meus Favoritos
                    </h1>

                    {flights.length === 0 ? (
                        <p className="text-center text-gray-500">Nenhum favorito adicionado.</p>
                    ) : (
                        <DataTable columns={columns} data={flights} />
                    )}
                </div>
            </div>
        </div>
    );
}
