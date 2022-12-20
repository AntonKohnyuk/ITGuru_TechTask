import { createClient } from "pexels";
import { Dispatch } from "redux";
import { PhotosActionsTypes } from "../../entities/enums/fetch";
import { PAGES } from "../../entities/enums/pages";
import { PagParams, PhotosAction } from "../../entities/types/photos";

export const fetchPhotos = (
  paginationParams: PagParams = { page: 1, per_page: 50, query: "" },
  pageName?: string
) => {
  const client = createClient(`${process.env.REACT_APP_PEXELS_API_KEY}`);

  return async (dispatch: Dispatch<PhotosAction>) => {
    dispatch({ type: PhotosActionsTypes.FETCH_PHOTOS });
    try {
      const response =
        pageName === PAGES.MAIN
          ? await client.photos.curated(paginationParams)
          : await client.photos.search(paginationParams);
      if ("photos" in response) {
        dispatch({
          type: PhotosActionsTypes.FETCH_PHOTOS_SUCCESS,
          payload: { photos: response.photos },
        });
      } else throw new Error();
    } catch (e) {
      dispatch({
        type: PhotosActionsTypes.FETCH_PHOTOS_ERROR,
        payload: "Ошибка загрузки фото!",
      });
    }
  };
};
