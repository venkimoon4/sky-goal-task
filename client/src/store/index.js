import {combineReducers, createStore} from "redux"

import userReducer from "./userReducer"
const store=createStore(combineReducers({
  userReducer
}))

export default store;
