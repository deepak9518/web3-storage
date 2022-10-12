import { legacy_createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
// create the saga middleware
// mount it on the Store
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
