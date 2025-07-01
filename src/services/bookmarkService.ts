import api from "@/lib/api";

export function addBookmark(flightNumber: string) {
    return api.post("/bookmarks", { flightNumber });
}

export function getBookmarks() {
  return api.get("/bookmarks").then((res) => res.data);
}

export function removeBookmark(flightNumber: string) {
  return api.delete(`/bookmarks/${flightNumber}`);
}