import { userReducer } from "./user";
import { dialogReducer } from "./dialogs";
import { combineReducers } from "redux";
import { commonReducer } from "./common/slice";
const rootReducer = combineReducers({
  user: userReducer,
  dialog: dialogReducer,
  common: commonReducer,
});

export type ReduxState = ReturnType<typeof rootReducer>;
export default rootReducer;
