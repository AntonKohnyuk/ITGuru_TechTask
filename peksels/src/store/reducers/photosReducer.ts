import { PhotosActionsTypes } from "../../entities/enums/fetch";
import { PhotosAction, PhotosState } from "../../entities/types/photos";

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
};

export const photosReducer = (
  state = initialState,
  action: PhotosAction
): PhotosState => {
  switch (action.type) {
    case PhotosActionsTypes.FETCH_PHOTOS:
      return {
        ...state,
        loading: true,
        error: null,
        photos: [...state.photos],
      };
    case PhotosActionsTypes.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        photos: [...state.photos, ...action.payload.photos],
      };
    case PhotosActionsTypes.FETCH_PHOTOS_ERROR:
      return { ...state, loading: false, error: action.payload, photos: [] };
    default:
      return state;
  }
};
