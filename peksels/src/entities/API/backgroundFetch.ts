import { createClient, PaginationParams, Photo } from "pexels";
import { PagParams } from "../types/photos";

export function backgroundFetch() {
  const client = createClient(`${process.env.REACT_APP_PEXELS_API_KEY}`);
  const paginationParams: PagParams = {
    page: Math.floor(Math.random() * (8000 - 1)) + 1,
    per_page: 1,
    query: "Nature",
  };

  async function fetchImg() {
    return await client.photos
      .search(paginationParams)
      .then((photos) => {
        if ("photos" in photos) {
          return photos.photos;
        }
        throw new Error(photos.error);
      })
      .then((photos) => photos[0]);
  }
  return fetchImg();
}
