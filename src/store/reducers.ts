import { combineReducers } from "redux";
import modalSlice from "./slices/modalSlice";

export const reducers = combineReducers({
  modalItems: modalSlice,
});
