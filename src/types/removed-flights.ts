export interface RemovedFlight {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    price: string;
    isRemoved?: boolean;
}