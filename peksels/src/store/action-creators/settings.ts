import { PaginationParams } from "pexels";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { SettingsAction } from "../../entities/types/photos";

export function setFetchSettings(
  newSettings: PaginationParams
): SettingsAction {
  return {
    type: SetSettingsActionsTypes.SET_SETTINGS,
    payload: newSettings,
  };
}
