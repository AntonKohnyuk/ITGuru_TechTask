import { PaginationParams } from "pexels";
import { SetSettingsActionsTypes } from "../../entities/enums/settings";
import { PagParams, SetFetchSettingsAction } from "../../entities/types/photos";

const initialState: PagParams = {
  per_page: 15,
  page: 1,
  query: "",
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
