import api from "@/lib/api";

export function addBookmark(flightNumber: string) {
    return api.post("/bookmarks", { flightNumber });
}