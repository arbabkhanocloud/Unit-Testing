import { combineReducers } from "redux";
import columnReducer from "./column/column.reducer";

const rootReducer = combineReducers({
  columns: columnReducer,
});

export default rootReducer;
