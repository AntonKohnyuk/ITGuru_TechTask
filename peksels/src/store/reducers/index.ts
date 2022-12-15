import { combineReducers } from "redux";
import fetchSettingsReducer from "./fetchSettingsReducer";
import { photosReducer } from "./photosReducer";

export const rootReducer = combineReducers({
  photos: photosReducer,
  fetchSettings: fetchSettingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
