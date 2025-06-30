"use client";

import React, { useEffect, useState } from "react";
import { DataInput } from "./data-input";
import { Input } from "./input";
import { searchFlights, getFlights } from "@/services/flightService";
import { format } from "date-fns";
import { Button } from "./button";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { Plane } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomPagination } from "./custom-pagination";

interface Flight {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    price: string;
}

export default function SearchFlight() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState<Date | undefined>();
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 10;

    useEffect(() => {
        if (!hasSearched) {
            fetchFlights(page);
        }
    }, [page, hasSearched]);

    async function fetchFlights(pageNumber: number) {
        setLoading(true);
        try {
            const response = await getFlights(pageNumber, pageSize);
            setFlights(response.data);
            setTotalPages(Math.ceil(response.total / pageSize));
        } catch (error) {
            setFlights([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        setHasSearched(true);

        try {
            const formattedDate = format(date!, "yyyy-MM-dd");
            const data = await searchFlights({ origin, destination, departure: formattedDate });
            setFlights(data);
        } catch (error) {
            setFlights([]);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    className="border border-gray-300 p-4 rounded-lg"
                    type="text"
                    placeholder="Origem"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                />
                <Input
                    className="border border-gray-300 p-4 rounded-lg"
                    type="text"
                    placeholder="Destino"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <DataInput date={date} setDate={setDate} />
                <div className="md:col-span-3">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Buscando..." : "Buscar voos"}
                    </Button>
                </div>
            </form>

            {loading && (
                <div className="mt-8 space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && flights.length > 0 && (
                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[800px] mx-auto rounded-xl border border-gray-300 bg-gray-50 shadow-lg">
                            <DataTable columns={columns} data={flights} />
                        </div>
                    </div>

                    {!hasSearched && (
                        <CustomPagination
                            totalPages={totalPages}
                            currentPage={page}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    )}
                </div>
            )}

            {hasSearched && !loading && flights.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
                    <Plane className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">Nenhum voo encontrado para os critérios informados.</p>
                </div>
            )}
        </div>
    );
}
