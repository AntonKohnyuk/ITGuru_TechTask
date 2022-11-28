import { createClient } from "pexels";
import { PEXELS_API_KEY } from "../../types/photos";

export const fetchPhotos = () => {
  const client = createClient(PEXELS_API_KEY);

  async function fetch() {
    try {
      await client.photos
        .curated({ per_page: 15 })
        .then((photos) => console.log(photos));
    } catch (e) {}
  }
  fetch();
};
