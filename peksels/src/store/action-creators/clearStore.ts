import { Dispatch } from "react";
import { PhotosActionsTypes } from "../../entities/enums/fetch";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { PhotosAction, SettingsAction } from "../../entities/types/photos";

export const clearStore = () => {
  return (dispatch: Dispatch<PhotosAction | SettingsAction>): void => {
    dispatch({ type: PhotosActionsTypes.CLEAR_STORE });
    dispatch({ type: SetSettingsActionsTypes.CLEAR_STORE });
  };
};
