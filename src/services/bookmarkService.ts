import api from "@/lib/api";

export function addBookmark(flightNumber: string) {
    return api.post("/bookmarks", { flightNumber });
}

export function getBookmarks() {
  return api.get("/bookmarks").then((res) => res.data);
}