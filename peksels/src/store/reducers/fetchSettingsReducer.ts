import { PaginationParams } from "pexels";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { PagParams, SettingsAction } from "../../entities/types/photos";

const initialState: PagParams = {
  per_page: 30,
  page: 1,
  query: "",
};

const fetchSettingsReducer = (
  state = initialState,
  action: SettingsAction
): PaginationParams => {
  switch (action.type) {
    case SetSettingsActionsTypes.SET_SETTINGS:
      return { ...state, ...action.payload };
    case SetSettingsActionsTypes.CLEAR_STORE:
      return { ...initialState };
    default:
      return state;
  }
};

export default fetchSettingsReducer;
