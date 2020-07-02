import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import collectionsReducer from "./collection/reducer";
import sessionsReducer from "./session/reducer";

export default combineReducers({
  appState,
  user,
  collections: collectionsReducer,
  sessions: sessionsReducer,
});
