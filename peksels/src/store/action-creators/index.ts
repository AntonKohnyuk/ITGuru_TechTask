import * as PhotosActionCreators from "./photos";
import * as SettingsActionCreators from "./settings";
import * as ClearStore from "./clearStore";

export default {
  ...PhotosActionCreators,
  ...SettingsActionCreators,
  ...ClearStore,
};
