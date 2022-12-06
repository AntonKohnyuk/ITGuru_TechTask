import { PaginationParams } from "pexels";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { SetFetchSettingsAction } from "../../entities/types/photos";

const initialState: PaginationParams = {
  per_page: 30,
  page: 1,
  query: undefined,
};

const fetchSettingsReducer = (
  state = initialState,
  action: SetFetchSettingsAction
): PaginationParams => {
  switch (action.type) {
    case SetSettingsActionsTypes.SET_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default fetchSettingsReducer;
