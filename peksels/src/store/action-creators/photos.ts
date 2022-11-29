import { createClient } from "pexels";

export const fetchPhotos = () => {
  const client = createClient(`${process.env.REACT_APP_PEXELS_API_KEY}`);

  return async (per_page = { per_page: 15 }) => {
    try {
      await client.photos.curated(per_page).then();
    } catch (e) {}
  };
};
