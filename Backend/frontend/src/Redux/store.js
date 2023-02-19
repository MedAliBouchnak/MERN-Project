import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Middleware from 'redux-thunk';
import Reducers from "./Reducers";
const intialeState = {};
const store = createStore(
  Reducers,
  intialeState,
  composeWithDevTools(applyMiddleware(Middleware))
);
export default store;
