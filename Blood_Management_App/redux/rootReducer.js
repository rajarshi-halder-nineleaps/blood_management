import { combineReducers } from "redux";
import registerIndReducer from "./RegisterInd/reducer";

const rootReducer = combineReducers({ registerIndState: registerIndReducer });

export default rootReducer;
