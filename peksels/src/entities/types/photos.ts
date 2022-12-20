import { PaginationParams, Photo } from "pexels";
import { PhotosActionsTypes } from "../enums/fetch";
import { SetSettingsActionsTypes } from "../enums/settings";

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: null | string;
}

export interface PhotoColumns {
  firstColumn: Photo[];
  firstColumnHeight: number;

  secondColumn: Photo[];
  secondColumnHeight: number;

  thirdColumn: Photo[];
  thirdColumnHeight: number;
}

export interface PhotosFilters {
  orientations: string;
  sizes: string;
}

interface FetchPhotosAction {
  type: PhotosActionsTypes.FETCH_PHOTOS;
}

interface FetchPhotosSuccessAction {
  type: PhotosActionsTypes.FETCH_PHOTOS_SUCCESS;
  payload: {
    photos: Photo[];
  };
}

interface FetchPhotosErrorAction {
  type: PhotosActionsTypes.FETCH_PHOTOS_ERROR;
  payload: string;
}

interface ClearStorePhotos {
  type: PhotosActionsTypes.CLEAR_STORE;
}

interface ClearStoreSettings {
  type: SetSettingsActionsTypes.CLEAR_STORE;
}

export type PhotosAction =
  | FetchPhotosAction
  | FetchPhotosErrorAction
  | FetchPhotosSuccessAction
  | ClearStorePhotos;

interface SetFetchSettingsAction {
  type: SetSettingsActionsTypes.SET_SETTINGS;
  payload: PaginationParams;
}

export type SettingsAction = SetFetchSettingsAction | ClearStoreSettings;

export type PagParams = PaginationParams & { query: string };
