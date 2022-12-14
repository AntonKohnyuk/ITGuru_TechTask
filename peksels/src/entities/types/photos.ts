import { PaginationParams, Photo } from "pexels";
import { PhotosActionsTypes } from "../enums/fetch";
import { SetSettingsActionsTypes } from "../enums/settings";

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: null | string;
}

interface FetchPhotosAction {
  type: PhotosActionsTypes.FETCH_PHOTOS;
}

interface FetchPhotosSuccessAction {
  type: PhotosActionsTypes.FETCH_PHOTOS_SUCCESS;
  payload: {
    photos: Photo[];
    next_page: number;
  };
}

interface FetchPhotosErrorAction {
  type: PhotosActionsTypes.FETCH_PHOTOS_ERROR;
  payload: string;
}

export type PhotosAction =
  | FetchPhotosAction
  | FetchPhotosErrorAction
  | FetchPhotosSuccessAction;

export interface SetFetchSettingsAction {
  type: SetSettingsActionsTypes.SET_SETTINGS;
  payload: PaginationParams;
}

export type PagParams = PaginationParams & { query: string };
