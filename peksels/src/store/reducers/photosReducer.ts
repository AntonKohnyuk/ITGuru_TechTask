import { PhotosState } from "../../types/photos";

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
};

export const photosReducer = (state = initialState): PhotosState => {
  switch (state) {
    default:
      return state;
  }
};
