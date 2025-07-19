import api from "@/lib/api";

interface SearchFlightParams {
    origin: string;
    destination: string;
    departure: string;
}

export async function searchFlights(params: SearchFlightParams) {
    const { origin, destination, departure } = params;
    const response = await api.get("/flights/search", {
        params: {
            origin,
            destination,
            departure
        }
    });
    return response.data;
}

export function findFlightByFlightNumber(flightNumber: string) {
  return api.get(`/flights/${flightNumber}`).then((res) => res.data);
}

export async function getFlights(page = 1, pageSize = 10) {
    const response = await api.get("/flights", {
        params: {
            page,
            pageSize
        }
    });
    return response.data;
}