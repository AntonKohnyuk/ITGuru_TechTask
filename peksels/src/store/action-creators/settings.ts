import { PaginationParams } from "pexels";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { SetFetchSettingsAction } from "../../entities/types/photos";

export function setFetchSettings(
  newSettings: PaginationParams
): SetFetchSettingsAction {
  return {
    type: SetSettingsActionsTypes.SET_SETTINGS,
    payload: newSettings,
  };
}
