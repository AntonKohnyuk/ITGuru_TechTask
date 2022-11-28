export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: null | string;
}

export const PEXELS_API_KEY =
  "563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf";
