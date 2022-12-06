import { createClient, PaginationParams } from "pexels";
import { Dispatch } from "redux";
import { PhotosActionsTypes } from "../../entities/enums/fetch";
import { PhotosAction } from "../../entities/types/photos";

export const fetchPhotos = (
  paginationParams: PaginationParams = { page: 1, per_page: 30 }
) => {
  const client = createClient(`${process.env.REACT_APP_PEXELS_API_KEY}`);

  return async (dispatch: Dispatch<PhotosAction>) => {
    dispatch({ type: PhotosActionsTypes.FETCH_PHOTOS });
    await client.photos
      .curated(paginationParams)
      .then((photos) => {
        if ("photos" in photos) {
          return photos.photos;
        }
        throw new Error(photos.error);
      })
      .then((photos) => {
        dispatch({
          type: PhotosActionsTypes.FETCH_PHOTOS_SUCCESS,
          payload: { photos: photos, next_page: 1 },
        });
      })
      .catch((e) => {
        dispatch({
          type: PhotosActionsTypes.FETCH_PHOTOS_ERROR,
          payload: "Ошибка загрузки фото!",
        });
      });
  };
};
